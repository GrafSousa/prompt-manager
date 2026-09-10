import { FetchPromptsUseCase } from '@/domain/prompt/application/use-cases/fetch-prompts';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { PromptsPresenter } from '@/presentation/prompts/presenters/prompts-presenter';

export class FetchPromptsQuery {
  constructor(private fetchPromptsUseCase: FetchPromptsUseCase) {}

  async handle({ cursor, limit, q }: PaginationParams) {
    const result = await this.fetchPromptsUseCase.execute({ q, cursor, limit });

    if (result.isLeft()) {
      return {
        prompts: null,
      };
    }

    const { prompts, nextCursor } = result.value;

    return {
      nextCursor,
      prompts: prompts.map(PromptsPresenter.toView),
    };
  }
}
