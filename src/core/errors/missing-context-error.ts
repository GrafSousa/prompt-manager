export class MissingContextError extends Error {
  constructor(hookeName: string, identifier: string) {
    super(`The hook ${hookeName} should be used within ${identifier}.`);
  }
}
