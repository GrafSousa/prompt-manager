import { PaginationParams } from '@/core/repositories/pagination-params';
import { FindManyRecentResponse } from '@/core/repositories/prompts-repository';
import { PromptsRepository } from '@/domain/prompt/application/repositories/prompts-repository';
import { Prompt } from '@/domain/prompt/enterprise/entities/prompt';

export class InMemoryPromptsRepository implements PromptsRepository {
  public items: Prompt[] = [];

  async save(prompt: Prompt): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.equals(prompt.id));

    this.items[itemIndex] = prompt;
  }

  async findManyRecent({
    q,
    cursor,
    limit = 20,
  }: PaginationParams): Promise<FindManyRecentResponse> {
    if (q) {
      const normalizedSearch = q?.trim().toLowerCase();

      const prompts = this.items.filter((item) =>
        item.title.includes(normalizedSearch)
      );

      this.items = prompts;
    }

    const sortedPrompts = this.items.sort((a, b) => {
      const createdAtDifference = b.createdAt.getTime() - a.createdAt.getTime();

      if (createdAtDifference !== 0) {
        return createdAtDifference;
      }

      return b.id.toString().localeCompare(a.id.toString());
    });

    let startIndex = 0;

    if (cursor) {
      const cursorIndex = sortedPrompts.findIndex(
        (prompt) => prompt.id.toString() === cursor
      );

      if (cursorIndex === -1) {
        throw new Error('Cursor not found.');
      }

      startIndex = cursorIndex + 1;
    }

    const records = sortedPrompts.slice(startIndex, startIndex + limit + 1);

    const hasNextPage = records.length > limit;

    const prompts = hasNextPage ? records.slice(0, limit) : records;

    return {
      prompts,
      nextCursor: hasNextPage ? (prompts.at(-1)?.id.toString() ?? null) : null,
    };
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
