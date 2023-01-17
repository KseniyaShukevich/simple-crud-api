class InMemoryStorage<T> {
  private items: Array<T> = [];

  public async getAll(): Promise<Array<T>> {
    return this.items;
  }

  public async findBy(key: keyof T, value: any): Promise<T | undefined> {
    const findedItem = this.items.find((item) => item[key] === value);

    return findedItem;
  }

  public async add(item: T): Promise<void> {
    this.items.push(item);
  }

  public async update(key: keyof T, value: any, updatedItem: T): Promise<T | undefined> {
    const findedItem = this.items.find((item) => item[key] === value);

    if (!findedItem) {
      return undefined;
    }

    const newItems = this.items.map((item) => {
      if (item[key] === value) {
        return updatedItem;
      }

      return item;
    });

    this.items = newItems;

    return updatedItem;
  }

  public async remove(key: keyof T, value: any): Promise<T | undefined> {
    const findedItem = this.items.find((item) => item[key] === value);

    if (findedItem) {
      const newItems = this.items.filter((item) => item[key] !== value);

      this.items = newItems;
    }

    return findedItem;
  }

  public async clear() {
    this.items = [];
  }
}

export default InMemoryStorage;
