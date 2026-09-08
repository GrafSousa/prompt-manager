import { Either, right } from '@/core/either';
import { PromptsRepository } from '../repositories/prompts-repository';
import { Prompt } from '../../enterprise/entities/prompt';

type FetchPromptsUseCaseResponse = Either<
  null,
  {
    success: boolean;
    prompts: Prompt[];
  }
>;

export class FetchPromptsUseCase {
  constructor(private promptsRepository: PromptsRepository) {}

  async execute(): Promise<FetchPromptsUseCaseResponse> {
    const prompts = await this.promptsRepository.findMany();

    return right({
      prompts,
      success: true,
    });
  }
}
