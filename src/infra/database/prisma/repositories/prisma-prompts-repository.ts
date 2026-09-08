import { PromptsRepository } from '@/domain/prompt/application/repositories/prompts-repository';
import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';
import { PrismaService } from './prisma-service';
import { PrismaPromptMapper } from '../mappers/prisma-prompt-mapper';

export class PrismaPromptsRepository implements PromptsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<Prompt[]> {
    const prompts = await this.prisma.prompt.findMany();

    return prompts.map(PrismaPromptMapper.toDomain);
  }

  async create(prompt: Prompt): Promise<void> {
    const data = PrismaPromptMapper.toPrisma(prompt);

    await this.prisma.prompt.create({
      data,
    });
  }
}
