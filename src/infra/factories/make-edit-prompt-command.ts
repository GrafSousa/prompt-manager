import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { EditPromptCommand } from '../handlers/edit-prompt-command';
import { InMemoryPromptsRepository } from '../test/repositories/in-memory-prompts-repository';
import { EditPromptUseCase } from '@/domain/prompt/application/use-cases/edit-prompt';

const isDev = false;

export class MakeEditPromptCommandFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = isDev
      ? new InMemoryPromptsRepository()
      : new PrismaPromptsRepository(prisma);

    const editPromptUseCase = new EditPromptUseCase(promptsRepository);

    return new EditPromptCommand(editPromptUseCase);
  }
}
