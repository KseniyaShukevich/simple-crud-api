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

  public async update(key: keyof T, value: any, updatedItem: T): Promise<T> {
    const newItems = this.items.map((item) => {
      if (item[key] === value) {
        return updatedItem;
      }

      return item;
    });

    this.items = newItems;

    return updatedItem;
  }

  public async remove(key: keyof T, value: any): Promise<void> {
    const newItems = this.items.filter((item) => item[key] !== value);

    this.items = newItems;
  }
}

export default InMemoryStorage;
