import { DAO } from '../../daos/dao';
import { Problem, ProblemAttributes, ProblemCreationAttributes } from '../../models/Problem';
import { UserCompletedProblem } from '../../models/UserCompletedProblem';

class ProblemDAO implements DAO<ProblemAttributes> {
  async create(item: ProblemCreationAttributes): Promise<ProblemAttributes> {
    const problem = await Problem.create(item);
    return problem.toJSON();
  }

  async findById(id: number): Promise<ProblemAttributes | null> {
    const problem = await Problem.findByPk(id);
    return problem ? problem.toJSON() : null;
  }

  async findAll(): Promise<ProblemAttributes[]> {
    const problems = await Problem.findAll();
    return problems.map((problem) => problem.toJSON());
  }
  async findAllByTopicId(userId: number, topicId: number, pageSize:number, offset:number, difficultyFilter:string): Promise<ProblemAttributes[]> {
    let where = {
      topic_id: topicId
    }

    if(difficultyFilter !== "all"){
      where["difficulty_level"] = difficultyFilter
    }
    const problems = await Problem.findAll({
      where, // Filter by topic_id
      limit: pageSize,
      offset: offset, // Pagination
      include: [{
        model: UserCompletedProblem,
        as: 'user_completed',
        where: {
          user_id: userId 
        },
        required: false,
      }],
      attributes: ['id', 'problem_statement', 'difficulty_level', 'topic_id', 'youtube_tutorial_link', 'leetcode_link', 'article_link'],
    });
  
    return problems.map((problem) => problem.toJSON());
  }

  async getCountByTopicId(id: number, difficultyFilter: string): Promise<number> {
    let where = {
      topic_id: id
    }

    if(difficultyFilter !== "all"){
      where["difficulty_level"] = difficultyFilter
    }
    const totalProblems = await Problem.count({
        where
    });
    return totalProblems;
  }

  async update(id: number, item: Partial<ProblemAttributes>): Promise<boolean> {
    const [updatedRows] = await Problem.update(item, { where: { id } });
    return updatedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await Problem.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

export default ProblemDAO;
