import { PaginationParams } from '@/core/repositories/pagination-params';
import { Prompt } from '../../enterprise/entities/prompt';
import { FindManyRecentResponse } from '@/core/repositories/prompts-repository';

export interface PromptsRepository {
  create(prompt: Prompt): Promise<void>;
  delete(prompt: Prompt): Promise<void>;
  findById(id: string): Promise<Prompt | null>;
  findManyRecent(request?: PaginationParams): Promise<FindManyRecentResponse>;
}
