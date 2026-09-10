import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { DeletePromptCommand } from '../handlers/delete-prompt-command';
import { DeletePromptUseCase } from '@/domain/prompt/application/use-cases/delete-prompt';

export class MakeDeletePromptCommandFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = new PrismaPromptsRepository(prisma);

    const deletePromptUseCase = new DeletePromptUseCase(promptsRepository);

    return new DeletePromptCommand(deletePromptUseCase);
  }
}
