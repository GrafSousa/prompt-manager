import { PromptResponseDTO } from '@/infra/dtos/prompt-dto';

export interface FetchManyPromptsDto {
  nextCursor: string | null;
  prompts: PromptResponseDTO[];
}
