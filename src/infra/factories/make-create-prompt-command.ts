import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { CreatePromptCommand } from '../handlers/create-prompt-command';
import { InMemoryPromptsRepository } from '../test/repositories/in-memory-prompts-repository';
import { CreatePromptUseCase } from '@/domain/prompt/application/use-cases/create-prompt';

const isDev = false;

export class MakeCreatePromptCommandFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = isDev
      ? new InMemoryPromptsRepository()
      : new PrismaPromptsRepository(prisma);

    const createPromptUseCase = new CreatePromptUseCase(promptsRepository);

    return new CreatePromptCommand(createPromptUseCase);
  }
}
