import { Either, right } from '@/core/either';
import { PromptsRepository } from '../repositories/prompts-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { FindManyRecentResponse } from '../dtos/find-many-recent-response';

type FetchPromptsUseCaseResponse = Either<null, FindManyRecentResponse>;

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
