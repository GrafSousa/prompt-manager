import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { DeletePromptCommand } from '../handlers/delete-prompt-command';
import { InMemoryPromptsRepository } from '../test/repositories/in-memory-prompts-repository';
import { DeletePromptUseCase } from '@/domain/prompt/application/use-cases/delete-prompt';

const isDev = false;

export class MakeDeletePromptCommandFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = isDev
      ? new InMemoryPromptsRepository()
      : new PrismaPromptsRepository(prisma);

    const deletePromptUseCase = new DeletePromptUseCase(promptsRepository);

    return new DeletePromptCommand(deletePromptUseCase);
  }
}
