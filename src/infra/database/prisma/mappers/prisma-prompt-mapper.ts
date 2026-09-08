import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';
import { Prisma, Prompt as PrismaPrompt } from '@/generated/prisma/client';

export class PrismaPromptMapper {
  static toDomain(raw: PrismaPrompt) {
    const prompt = Prompt.create(
      {
        title: raw.title,
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    );

    return prompt;
  }

  static toPrisma(prompt: Prompt): Prisma.PromptUncheckedCreateInput {
    return {
      id: prompt.id.toString(),
      title: prompt.title,
      content: prompt.content,
      createdAt: prompt.createdAt,
    };
  }
}
