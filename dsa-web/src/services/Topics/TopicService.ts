import TopicDAO from './TopicDao';
import ProblemDAO from './ProblemDao';
import { PaginationResponse } from '../../daos/dao';

class TopicsService {
  private topicDAO: TopicDAO;
  private problemDAO: ProblemDAO;

  constructor(topicDAO: TopicDAO, problemDAO: ProblemDAO) {
    this.topicDAO = topicDAO;
    this.problemDAO = problemDAO;
  }

  async listTopics(page: number, pageSize: number): Promise<PaginationResponse> {
    try {

      const offset = (page - 1) * pageSize; // Calculate the offset

      // Count total number of topics
      const totalTopics = await this.topicDAO.getTopicCount();

      // Calculate the total number of pages (round up to ensure we don't miss the last page)
      const totalPages = Math.ceil(totalTopics / pageSize);

      // Fetch the topics with pagination
      const topics = await this.topicDAO.findAllTopics(pageSize, offset);

      return {
        totalPages,
        page,
        pageSize,
        topics
      }
    }catch(err){
      console.error(err);
      throw new Error('Error fetching topics');
    }
  }

  async listProblemStatements(userId: number, topicId: number, page: number, pageSize: number, difficultyFilter: string): Promise<PaginationResponse> {
    try {
      console.log(userId);
      const offset = (page - 1) * pageSize; // Calculate the offset

      // Count total number of topics
      const totalTopicProblems = await this.problemDAO.getCountByTopicId(topicId, difficultyFilter);

      // Calculate the total number of pages (round up to ensure we don't miss the last page)
      const totalPages = Math.ceil(totalTopicProblems / pageSize);

      // Fetch the topics with pagination
      const topics = await this.problemDAO.findAllByTopicId(userId, topicId, pageSize, offset, difficultyFilter);

      return {
        totalPages,
        page,
        pageSize,
        topics
      }
    }catch(err){
      console.error(err);
      throw new Error(`Error fetching topics: ${topicId} problems`);
    }
  }
}

export default TopicsService;
