import { Either, left, right } from '@/core/either';
import { PromptsRepository } from '../repositories/prompts-repository';
import { Prompt } from '../../enterprise/entities/prompt';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { GetPromptRequest } from '../dtos/get-prompt-request';

type GetPromptUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    success: boolean;
    prompt: Prompt;
  }
>;

export class GetPromptUseCase {
  constructor(private promptsRepository: PromptsRepository) {}

  async execute({ id }: GetPromptRequest): Promise<GetPromptUseCaseResponse> {
    const prompt = await this.promptsRepository.findById(id);

    if (!prompt) {
      return left(new ResourceNotFoundError());
    }

    return right({
      prompt,
      success: true,
    });
  }
}
