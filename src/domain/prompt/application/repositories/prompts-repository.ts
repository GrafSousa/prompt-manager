import { Prompt } from '../../enterprise/entities/prompt';

export interface PromptsRepository {
  findMany(): Promise<Prompt[]>;
  create(prompt: Prompt): Promise<void>;
  delete(prompt: Prompt): Promise<void>;
  findById(id: string): Promise<Prompt | null>;
}
