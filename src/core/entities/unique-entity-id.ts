import { randomUUID } from 'node:crypto';

export class UniqueEntityId {
  private value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  toValue() {
    return this.value.toString();
  }

  toString() {
    return this.value.toString();
  }

  equals(id: UniqueEntityId) {
    return this.value === id.toValue();
  }
}
