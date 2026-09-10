import { InMemoryPromptsRepository } from '@/infra/test/repositories/in-memory-prompts-repository';
import { EditPromptUseCase } from './edit-prompt';
import { InvalidTitleError } from './errors/invalid-title-error';
import { InvalidContentError } from './errors/invalid-content-error';
import { makePrompt } from '@/infra/test/factories/makePrompt';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryPromptsRepository: InMemoryPromptsRepository;
let sut: EditPromptUseCase;

describe('use-case: Edit prompt', () => {
  beforeEach(() => {
    inMemoryPromptsRepository = new InMemoryPromptsRepository();
    sut = new EditPromptUseCase(inMemoryPromptsRepository);
  });

  it('should be possible to edit a prompt', async () => {
    const prompt = makePrompt();

    inMemoryPromptsRepository.items.push(prompt);

    const result = await sut.execute({
      id: prompt.id.toString(),
      title: 'edited title',
      content: 'edited content',
    });

    if (result.isLeft()) {
      return;
    }

    const { success } = result.value;

    expect(success).toBe(true);
    expect(inMemoryPromptsRepository.items[0]).toMatchObject(
      expect.objectContaining({
        title: 'edited title',
        content: 'edited content',
      })
    );
  });

  it('should not be possible to edit a inexistent prompt', async () => {
    const result = await sut.execute({
      id: 'invalid-id',
      title: '',
      content: 'content-test',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be possible to edit a prompt with invalid title', async () => {
    const prompt = makePrompt();

    inMemoryPromptsRepository.items.push(prompt);

    const result = await sut.execute({
      id: prompt.id.toString(),
      title: '',
      content: 'content-test',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidTitleError);
  });

  it('should not be possible to edit a prompt with invalid content', async () => {
    const prompt = makePrompt();

    inMemoryPromptsRepository.items.push(prompt);

    const result = await sut.execute({
      id: prompt.id.toString(),
      title: 'title-test',
      content: '',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidContentError);
  });
});
