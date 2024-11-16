import UserDAO from './UserDao';
import UserCompletedProblemDao from './UserCompletedProblemDao';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getEnv } from '../../env';

class UserService {
  private userDAO: UserDAO;
  private UserCompletedProblemDao: UserCompletedProblemDao;

  constructor(userDAO: UserDAO, UserCompletedProblemDao: UserCompletedProblemDao) {
    this.userDAO = userDAO;
    this.UserCompletedProblemDao = UserCompletedProblemDao;
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userDAO.findByEmail(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, getEnv().LOGIN_SECRET, { expiresIn: '1h' });
    return token;
  }


  async completeTopic(userId: number, problemId: number, topicId: number, action: string): Promise<any> {
    if(action == "create"){
      return await this.UserCompletedProblemDao.create({ user_id: userId, problem_id: problemId, topic_id: topicId });
    }
    return await this.UserCompletedProblemDao.deleteUserProblem(userId, problemId);
  }

  async getDashboardData(userId: number): Promise<any> {
    const completedProblems = await this.UserCompletedProblemDao.findByUser(userId);
    // Business logic to prepare graph data
    const graphData = completedProblems.map(problem => ({
      topicId: problem.topic_id,
      problemId: problem.problem_id,
    }));

    return graphData;
  }
}

export default UserService;
