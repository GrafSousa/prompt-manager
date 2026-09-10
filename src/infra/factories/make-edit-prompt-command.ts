import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { EditPromptCommand } from '../handlers/edit-prompt-command';
import { EditPromptUseCase } from '@/domain/prompt/application/use-cases/edit-prompt';

export class MakeEditPromptCommandFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = new PrismaPromptsRepository(prisma);

    const editPromptUseCase = new EditPromptUseCase(promptsRepository);

    return new EditPromptCommand(editPromptUseCase);
  }
}
