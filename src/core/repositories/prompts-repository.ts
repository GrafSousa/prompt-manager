import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';

export interface FindManyRecentResponse {
  prompts: Prompt[];
  nextCursor: string | null;
}
