import { InMemoryPromptsRepository } from '@/infra/test/repositories/in-memory-prompts-repository';
import { FetchPromptsUseCase } from './fetch-prompts';
import { makePrompt } from '@/infra/test/factories/makePrompt';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryPromptsRepository: InMemoryPromptsRepository;
let sut: FetchPromptsUseCase;

describe('use-case: Fetch prompts', () => {
  beforeEach(() => {
    inMemoryPromptsRepository = new InMemoryPromptsRepository();
    sut = new FetchPromptsUseCase(inMemoryPromptsRepository);
  });

  it('should be possible to list prompts', async () => {
    const prompt1 = makePrompt({ title: 'test-title-1' });
    const prompt2 = makePrompt({ title: 'test-title-2' });

    inMemoryPromptsRepository.items.push(prompt1);
    inMemoryPromptsRepository.items.push(prompt2);

    const result = await sut.execute({});

    if (result.isLeft()) {
      return;
    }

    const { success } = result.value;

    expect(success).toBe(true);
    expect(inMemoryPromptsRepository.items).toHaveLength(2);
    expect(inMemoryPromptsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: prompt1.title,
        }),
        expect.objectContaining({
          title: prompt2.title,
        }),
      ])
    );
  });

  it('should be able to search prompts', async () => {
    const prompt1 = makePrompt({ title: 'test-title-1' });
    const prompt2 = makePrompt();
    const prompt3 = makePrompt();
    const prompt4 = makePrompt({ title: 'test-title-4' });
    const prompt5 = makePrompt();

    inMemoryPromptsRepository.items.push(prompt1);
    inMemoryPromptsRepository.items.push(prompt2);
    inMemoryPromptsRepository.items.push(prompt3);
    inMemoryPromptsRepository.items.push(prompt4);
    inMemoryPromptsRepository.items.push(prompt5);

    const result = await sut.execute({ q: 'TeSt' });

    expect(result.value?.prompts).toHaveLength(2);
    expect(inMemoryPromptsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: prompt1.title,
        }),
        expect.objectContaining({
          title: prompt4.title,
        }),
      ])
    );
  });

  it('should be able to fetch the last 2 prompts', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryPromptsRepository.create(
        makePrompt({}, new UniqueEntityId(i.toString()))
      );
    }

    const result = await sut.execute({ cursor: '2' });

    expect(result.value?.prompts).toHaveLength(2);
    expect(result.value?.nextCursor).toBe(null);
  });

  it('should be able to fetch paginated recent prompts', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryPromptsRepository.create(
        makePrompt({}, new UniqueEntityId(i.toString()))
      );
    }

    const result = await sut.execute({ limit: 5 });

    expect(result.value?.prompts).toHaveLength(5);
    expect(result.value?.nextCursor).toBe('5');
  });
});
