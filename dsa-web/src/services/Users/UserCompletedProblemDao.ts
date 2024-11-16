import { DAO } from '../../daos/dao';
import { UserCompletedProblem, UserCompletedProblemAttributes, UserCompletedProblemCreationAttributes } from '../../models/UserCompletedProblem';

class UserCompletedProblemDAO implements DAO<UserCompletedProblemAttributes> {
  async create(item: UserCompletedProblemCreationAttributes): Promise<UserCompletedProblemAttributes> {
    const userCompletedProblem = await UserCompletedProblem.create(item);
    return userCompletedProblem.toJSON();
  }

  async findByUser(userId: number): Promise<UserCompletedProblemAttributes[]> {
    const userCompletedProblems = await UserCompletedProblem.findAll({
      where: { user_id: userId },
    });
    return userCompletedProblems.map((problem) => problem.toJSON());
  }

  async findAll(): Promise<UserCompletedProblemAttributes[]> {
    const completedProblems = await UserCompletedProblem.findAll();
    return completedProblems.map((problem) => problem.toJSON());
  }


  async deleteUserProblem(userId: number, problemId: number): Promise<boolean> {
    const deletedRows = await UserCompletedProblem.destroy({
      where: { user_id: userId, problem_id: problemId },
    });
    return deletedRows > 0;
  }
}

export default UserCompletedProblemDAO;
