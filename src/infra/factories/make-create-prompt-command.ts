import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { CreatePromptCommand } from '../handlers/create-prompt-command';
import { CreatePromptUseCase } from '@/domain/prompt/application/use-cases/create-prompt';

export class MakeCreatePromptCommandFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = new PrismaPromptsRepository(prisma);

    const createPromptUseCase = new CreatePromptUseCase(promptsRepository);

    return new CreatePromptCommand(createPromptUseCase);
  }
}
