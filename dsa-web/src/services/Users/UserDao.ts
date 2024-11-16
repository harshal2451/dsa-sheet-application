import { DAO } from '../../daos/dao';
import { User, UserAttributes, UserCreationAttributes } from '../../models/User';

class UserDAO implements DAO<UserAttributes> {
  async create(item: UserCreationAttributes): Promise<UserAttributes> {
    const user = await User.create(item);
    return user.toJSON();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserAttributes | null> {
    const user = await User.findByPk(id);
    return user ? user.toJSON() : null;
  }

  async findAll(): Promise<UserAttributes[]> {
    const users = await User.findAll();
    return users.map((user) => user.toJSON());
  }

  async update(id: number, item: Partial<UserAttributes>): Promise<boolean> {
    const [updatedRows] = await User.update(item, { where: { id } });
    return updatedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await User.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

export default UserDAO;
