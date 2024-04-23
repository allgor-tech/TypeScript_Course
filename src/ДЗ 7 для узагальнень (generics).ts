function filterArray<T>(array: T[], condition: (value: T) => boolean): T[] {
  return array.filter(condition);
}

class Stack<T> {
  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

class Dictionary<K extends string | number | symbol, V> {
  private items: { [key in K]?: V } = {};

  get getItem(): { [key in K]?: V } {
    return this.items;
  }

  set setItem(item: { [key in K]?: V }) {
    this.items = item;
  }

  has(key: K): boolean {
    return key in this.items;
  }
}
