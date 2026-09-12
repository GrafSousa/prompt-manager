import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';

export interface FindManyRecentResponse {
  success?: boolean;
  prompts: Prompt[];
  nextCursor: string | null;
}
