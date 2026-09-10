'use server';

import { GetPromptRequest } from '@/domain/prompt/application/dtos/get-prompt-request';
import { MakeGetPromptQueryFactory } from '@/infra/factories/make-get-prompt-query';

export async function getPromptQuery(request: GetPromptRequest) {
  return MakeGetPromptQueryFactory.create().handle(request);
}
