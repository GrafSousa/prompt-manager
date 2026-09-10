import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';
import { PromptResponseDTO } from '@/infra/dtos/prompt-dto';

export class PromptsPresenter {
  static toView(prompt: Prompt): PromptResponseDTO {
    return {
      id: prompt.id.toString(),
      title: prompt.title,
      content: prompt.content,
    };
  }
}
