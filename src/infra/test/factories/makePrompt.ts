import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Prompt,
  PromptProps,
} from '@/domain/prompt/enterprise/entities/prompt';

export function makePrompt(
  override: Partial<PromptProps> = {},
  id?: UniqueEntityId
) {
  const prompt = Prompt.create(
    {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      ...override,
    },
    id
  );

  return prompt;
}
