import { PromptsRepository } from '@/domain/prompt/application/repositories/prompts-repository';
import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';
import { makePrompt } from '../factories/makePrompt';

export class InMemoryPromptsRepository implements PromptsRepository {
  public items: Prompt[] = [];

  async findMany(): Promise<Prompt[]> {
    for (let i = 0; i < 20; i++) {
      const prompt = makePrompt();

      this.items.push(prompt);
    }

    return this.items;
  }

  async create(prompt: Prompt): Promise<void> {
    this.items.push(prompt);
  }

  findById(id: string): Promise<Prompt | null> {
    throw new Error('Method not implemented.');
  }

  delete(prompt: Prompt): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
