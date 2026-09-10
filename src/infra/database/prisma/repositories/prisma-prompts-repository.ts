import { PromptsRepository } from '@/domain/prompt/application/repositories/prompts-repository';
import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';
import { PrismaService } from './prisma-service';
import { PrismaPromptMapper } from '../mappers/prisma-prompt-mapper';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { FindManyRecentResponse } from '@/domain/prompt/application/dtos/find-many-recent-response';

export class PrismaPromptsRepository implements PromptsRepository {
  constructor(private prisma: PrismaService) {}

  async save(prompt: Prompt): Promise<void> {
    await this.prisma.prompt.update({
      where: {
        id: prompt.id.toString(),
      },
      data: {
        title: prompt.title,
        content: prompt.content,
      },
    });
  }

  async findManyRecent({
    q,
    cursor,
    limit = 20,
  }: PaginationParams): Promise<FindManyRecentResponse> {
    const records = await this.prisma.prompt.findMany({
      where: {
        title: {
          contains: q?.trim().toLowerCase(),
          mode: 'insensitive',
        },
      },
      take: limit + 1,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

    const hasNextPage = records.length > limit;

    const prompts = hasNextPage ? records.slice(0, limit) : records;

    return {
      prompts: prompts.map(PrismaPromptMapper.toDomain),

      nextCursor: hasNextPage ? (prompts.at(-1)?.id ?? null) : null,
    };
  }

  async create(prompt: Prompt): Promise<void> {
    const data = PrismaPromptMapper.toPrisma(prompt);

    await this.prisma.prompt.create({
      data,
    });
  }

  async delete(prompt: Prompt): Promise<void> {
    const data = PrismaPromptMapper.toPrisma(prompt);

    await this.prisma.prompt.delete({
      where: {
        id: data.id,
      },
    });
  }

  async findById(id: string): Promise<Prompt | null> {
    const prompt = await this.prisma.prompt.findUnique({
      where: {
        id,
      },
    });

    if (!prompt) {
      return null;
    }

    return PrismaPromptMapper.toDomain(prompt);
  }
}
