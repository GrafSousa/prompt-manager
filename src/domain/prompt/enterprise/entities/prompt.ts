import { Optional } from '@/core/@types/optional';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface PromptProps {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class Prompt extends Entity<PromptProps> {
  static create(
    props: Optional<PromptProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const prompt = new Prompt(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return prompt;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;

    this.touch();
  }

  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;

    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
