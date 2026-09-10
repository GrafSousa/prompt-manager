/* eslint-disable @typescript-eslint/no-explicit-any */

type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delayInMs: number
): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delayInMs);
  };
}
