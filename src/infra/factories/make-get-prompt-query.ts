import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { GetPromptQuery } from '../handlers/get-prompt-query';
import { InMemoryPromptsRepository } from '../test/repositories/in-memory-prompts-repository';
import { GetPromptUseCase } from '@/domain/prompt/application/use-cases/get-prompt';

const isDev = false;

export class MakeGetPromptQueryFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = isDev
      ? new InMemoryPromptsRepository()
      : new PrismaPromptsRepository(prisma);

    const getPromptUseCase = new GetPromptUseCase(promptsRepository);

    return new GetPromptQuery(getPromptUseCase);
  }
}
