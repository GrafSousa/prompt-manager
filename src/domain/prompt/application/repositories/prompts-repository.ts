import { PaginationParams } from '@/core/repositories/pagination-params';
import { Prompt } from '../../enterprise/entities/prompt';
import { FindManyRecentResponse } from '../dtos/find-many-recent-response';

export interface PromptsRepository {
  save(prompt: Prompt): Promise<void>;
  create(prompt: Prompt): Promise<void>;
  delete(prompt: Prompt): Promise<void>;
  findById(id: string): Promise<Prompt | null>;
  findManyRecent(request?: PaginationParams): Promise<FindManyRecentResponse>;
}
