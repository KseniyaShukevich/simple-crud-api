import InMemoryStorage from '../../database/InMemoryStorage';
import User from './User';

class UserRepository {
  private database: InMemoryStorage<User>;

  constructor() {
    this.database = new InMemoryStorage();
  }

  public async create(user: User): Promise<User> {
    await this.database.add(user);

    return user;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.database.getAll();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.database.findBy('id', id);

    return user;
  }

  public async update(id: string, userUpdated: User): Promise<User> {
    const user = await this.database.update('id', id, userUpdated);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.database.remove('id', id);
  }
}

const userRepository = new UserRepository();

export default userRepository;
