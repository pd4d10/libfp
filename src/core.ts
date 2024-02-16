export class Chain<T> {
  private value: T;

  constructor(t: T) {
    this.value = t;
  }

  pipe<P extends any[], R>(fn: (t: T, ...args: P) => R, ...args: P) {
    return fn(this.value, ...args);
  }
}

export function chain<T>(t: T) {
  return new Chain(t);
}
