import { InMemoryPromptsRepository } from '@/infra/test/repositories/in-memory-prompts-repository';
import { CreatePromptUseCase } from './create-prompt';
import { InvalidTitleError } from './errors/invalid-title-error';
import { InvalidContentError } from './errors/invalid-content-error';

let inMemoryPromptsRepository: InMemoryPromptsRepository;
let sut: CreatePromptUseCase;

describe('use-case: Create prompt', () => {
  beforeEach(() => {
    inMemoryPromptsRepository = new InMemoryPromptsRepository();
    sut = new CreatePromptUseCase(inMemoryPromptsRepository);
  });

  it('should be possible to create a prompt', async () => {
    const result = await sut.execute({
      title: 'title-test',
      content: 'content-test',
    });

    const { success, prompt } = result.value;

    expect(success).toBe(true);
    expect(prompt).toEqual(inMemoryPromptsRepository.items[0]);
  });

  it('should not be possible to create a prompt with invalid title', async () => {
    const result = await sut.execute({
      title: '',
      content: 'content-test',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidTitleError);
  });

  it('should not be possible to create a prompt with invalid content', async () => {
    const result = await sut.execute({
      title: 'title-test',
      content: '',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidContentError);
  });
});
