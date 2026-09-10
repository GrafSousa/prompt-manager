import { InMemoryPromptsRepository } from '@/infra/test/repositories/in-memory-prompts-repository';
import { DeletePromptUseCase } from './delete-prompt';
import { makePrompt } from '@/infra/test/factories/makePrompt';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryPromptsRepository: InMemoryPromptsRepository;
let sut: DeletePromptUseCase;

describe('use-case: Delete prompt', () => {
  beforeEach(() => {
    inMemoryPromptsRepository = new InMemoryPromptsRepository();
    sut = new DeletePromptUseCase(inMemoryPromptsRepository);
  });

  it('should be possible to delete a prompt', async () => {
    const prompt = makePrompt();

    inMemoryPromptsRepository.items.push(prompt);

    const result = await sut.execute({
      id: prompt.id.toString(),
    });

    if (result.isLeft()) {
      return;
    }

    const { success } = result.value;

    expect(success).toBe(true);
    expect(inMemoryPromptsRepository.items).toHaveLength(0);
  });

  it('should not be possible to delete a prompt', async () => {
    const result = await sut.execute({
      id: '1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
