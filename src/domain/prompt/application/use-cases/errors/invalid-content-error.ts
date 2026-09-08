import { UseCaseError } from '@/core/errors/use-case-error';

export class InvalidContentError extends Error implements UseCaseError {
  constructor() {
    super('Invalid content.');
  }
}
