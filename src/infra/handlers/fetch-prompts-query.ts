import { FetchPromptsUseCase } from '@/domain/prompt/application/use-cases/fetch-prompts';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { PromptsPresenter } from '../presenters/prompts-presenter';
import { FetchManyPromptsDto } from '../dtos/fetch-many-prompts-dto';

export class FetchPromptsQuery {
  constructor(private fetchPromptsUseCase: FetchPromptsUseCase) {}

  async handle({
    cursor,
    limit,
    q,
  }: PaginationParams): Promise<FetchManyPromptsDto> {
    const result = await this.fetchPromptsUseCase.execute({ q, cursor, limit });

    if (result.isLeft()) {
      return {
        nextCursor: null,
        prompts: [],
      };
    }

    const { prompts, nextCursor } = result.value;

    return {
      nextCursor,
      prompts: prompts.map(PromptsPresenter.toView),
    };
  }
}
