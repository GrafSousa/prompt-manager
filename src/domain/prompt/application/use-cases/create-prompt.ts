import { Either, left, right } from '@/core/either';
import { PromptsRepository } from '../repositories/prompts-repository';
import { Prompt } from '../../enterprise/entities/prompt';
import { InvalidTitleError } from './errors/invalid-title-error';
import { InvalidContentError } from './errors/invalid-content-error';

export interface CreatePromptRequest {
  title: string;
  content: string;
}

type CreatePromptResponse = Either<
  InvalidTitleError | InvalidContentError,
  {
    success: boolean;
    prompt: Prompt;
  }
>;

export class CreatePromptUseCase {
  constructor(private promptsRepository: PromptsRepository) {}

  async execute({
    title,
    content,
  }: CreatePromptRequest): Promise<CreatePromptResponse> {
    if (!title.trim()) {
      return left(new InvalidTitleError());
    }

    if (!content.trim()) {
      return left(new InvalidContentError());
    }

    const prompt = Prompt.create({ title, content });

    await this.promptsRepository.create(prompt);

    return right({ success: true, prompt });
  }
}
