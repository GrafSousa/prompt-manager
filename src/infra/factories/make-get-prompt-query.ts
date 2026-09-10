import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { GetPromptQuery } from '../handlers/get-prompt-query';
import { GetPromptUseCase } from '@/domain/prompt/application/use-cases/get-prompt';

export class MakeGetPromptQueryFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = new PrismaPromptsRepository(prisma);

    const getPromptUseCase = new GetPromptUseCase(promptsRepository);

    return new GetPromptQuery(getPromptUseCase);
  }
}
