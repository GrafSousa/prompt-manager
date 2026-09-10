import { Either, left, right } from '@/core/either';
import { PromptsRepository } from '../repositories/prompts-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { EditPromptRequest } from '../dtos/edit-prompt-request';
import { InvalidTitleError } from './errors/invalid-title-error';
import { InvalidContentError } from './errors/invalid-content-error';

type EditPromptUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    success: boolean;
  }
>;

export class EditPromptUseCase {
  constructor(private promptsRepository: PromptsRepository) {}

  async execute({
    id,
    title,
    content,
  }: EditPromptRequest): Promise<EditPromptUseCaseResponse> {
    const prompt = await this.promptsRepository.findById(id);

    if (!prompt) {
      return left(new ResourceNotFoundError());
    }

    if (!title?.trim()) {
      return left(new InvalidTitleError());
    }

    if (!content?.trim()) {
      return left(new InvalidContentError());
    }

    prompt.content = content;
    prompt.title = title;

    await this.promptsRepository.save(prompt);

    return right({
      success: true,
    });
  }
}
