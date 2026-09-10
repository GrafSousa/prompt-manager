import { FetchPromptsUseCase } from '@/domain/prompt/application/use-cases/fetch-prompts';
import { PrismaPromptsRepository } from '../database/prisma/repositories/prisma-prompts-repository';
import { PrismaService } from '../database/prisma/repositories/prisma-service';
import { FetchPromptsQuery } from '../handlers/fetch-prompts-query';

export class FetchPromptsQueryFactory {
  static create() {
    const prisma = PrismaService.getInstance();

    const promptsRepository = new PrismaPromptsRepository(prisma);

    const fetchPromptsUseCase = new FetchPromptsUseCase(promptsRepository);

    return new FetchPromptsQuery(fetchPromptsUseCase);
  }
}
