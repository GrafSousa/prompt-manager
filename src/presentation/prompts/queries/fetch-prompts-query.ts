'use server';

import { PaginationParams } from '@/core/repositories/pagination-params';
import { FetchPromptsQueryFactory } from '@/infra/factories/make-fetch-prompts-query';

export async function fetchPromptsQuery(request: PaginationParams) {
  return FetchPromptsQueryFactory.create().handle(request);
}
