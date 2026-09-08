import { InMemoryPromptsRepository } from '@/infra/test/repositories/in-memory-prompts-repository';
import { FetchPromptsUseCase } from './fetch-prompts';
import { makePrompt } from '@/infra/test/factories/makePrompt';

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

    const result = await sut.execute();

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
});
