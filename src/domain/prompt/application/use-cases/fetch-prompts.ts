import { Either, right } from '@/core/either';
import { PromptsRepository } from '../repositories/prompts-repository';
import { Prompt } from '../../enterprise/entities/prompt';
import { PaginationParams } from '@/core/repositories/pagination-params';

type FetchPromptsUseCaseResponse = Either<
  null,
  {
    success: boolean;
    prompts: Prompt[];
    nextCursor: string | null;
  }
>;

export class FetchPromptsUseCase {
  constructor(private promptsRepository: PromptsRepository) {}

  async execute({
    q,
    limit,
    cursor,
  }: PaginationParams): Promise<FetchPromptsUseCaseResponse> {
    const result = await this.promptsRepository.findManyRecent({
      q,
      limit,
      cursor,
    });

    return right({
      success: true,
      prompts: result.prompts,
      nextCursor: result.nextCursor,
    });
  }
}
