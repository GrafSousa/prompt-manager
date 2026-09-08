import { PromptsRepository } from '@/domain/prompt/application/repositories/prompts-repository';
import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';

export class InMemoryPromptsRepository implements PromptsRepository {
  public items: Prompt[] = [];

  async findMany(): Promise<Prompt[]> {
    return this.items;
  }

  async create(prompt: Prompt): Promise<void> {
    this.items.push(prompt);
  }

  async findById(id: string): Promise<Prompt | null> {
    const prompt = this.items.find((item) => item.id.toString() === id);

    if (!prompt) {
      return null;
    }

    return prompt;
  }

  async delete(prompt: Prompt): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.equals(prompt.id));

    this.items.splice(itemIndex, 1);
  }
}
