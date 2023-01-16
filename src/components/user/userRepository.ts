import { v4 as uuidv4 } from 'uuid';

import InMemoryStorage from '../../database/InMemoryStorage';
import User from './model/User';
import UserDtoType from './UserDtoType';

class UserRepository {
  private database: InMemoryStorage<User>;

  constructor() {
    this.database = new InMemoryStorage();
  }

  public async create(userDto: UserDtoType): Promise<User> {
    const user = new User(
      uuidv4(),
      userDto.username,
      userDto.age,
      userDto.hobbies,
    );

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

  public async update(id: string, userDtoUpdated: UserDtoType): Promise<User> {
    const userUpdated = new User(
      id,
      userDtoUpdated.username,
      userDtoUpdated.age,
      userDtoUpdated.hobbies,
    );
    const user = await this.database.update('id', id, userUpdated);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.database.remove('id', id);
  }
}

const userRepository = new UserRepository();

export default userRepository;
