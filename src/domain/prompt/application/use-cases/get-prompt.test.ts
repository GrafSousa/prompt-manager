import { InMemoryPromptsRepository } from '@/infra/test/repositories/in-memory-prompts-repository';
import { GetPromptUseCase } from './get-prompt';
import { makePrompt } from '@/infra/test/factories/makePrompt';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryPromptsRepository: InMemoryPromptsRepository;
let sut: GetPromptUseCase;

describe('use-case: Get prompt', () => {
  beforeEach(() => {
    inMemoryPromptsRepository = new InMemoryPromptsRepository();
    sut = new GetPromptUseCase(inMemoryPromptsRepository);
  });

  it('should be possible to get a prompt', async () => {
    const inMemoryPrompt = makePrompt();

    inMemoryPromptsRepository.items.push(inMemoryPrompt);

    const result = await sut.execute({
      id: inMemoryPrompt.id.toString(),
    });

    if (result.isLeft()) {
      return;
    }

    const { success, prompt } = result.value;

    expect(success).toBe(true);
    expect(prompt).toEqual(inMemoryPromptsRepository.items[0]);
  });

  it('should not be possible to get a inexistent prompt', async () => {
    const result = await sut.execute({
      id: 'invalid-prompt',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
