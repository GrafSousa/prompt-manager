import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { PromptsRepository } from '../repositories/prompts-repository';
import { Either, left, right } from '@/core/either';

interface DeletePromptUseCaseRequest {
  id: string;
}

type DeletePromptUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    success: true;
  }
>;

export class DeletePromptUseCase {
  constructor(private promptsRepository: PromptsRepository) {}

  async execute({
    id,
  }: DeletePromptUseCaseRequest): Promise<DeletePromptUseCaseResponse> {
    const prompt = await this.promptsRepository.findById(id);

    if (!prompt) {
      return left(new ResourceNotFoundError());
    }

    await this.promptsRepository.delete(prompt);

    return right({ success: true });
  }
}
