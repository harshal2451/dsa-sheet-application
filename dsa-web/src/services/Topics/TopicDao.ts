import { DAO } from '../../daos/dao';
import { Topic, TopicAttributes } from '../../models/Topic';

class TopicDAO implements DAO<TopicAttributes> {
  async create(item: TopicAttributes): Promise<TopicAttributes> {
    const topic = await Topic.create(item);
    return topic.toJSON();
  }

  async findById(id: number): Promise<TopicAttributes | null> {
    const topic = await Topic.findByPk(id);
    return topic ? topic.toJSON() : null;
  }

  async findAllTopics(pageSize: number, offset: number): Promise<TopicAttributes[]> {
    const topics = await Topic.findAll({
      limit: pageSize,
      offset,
    });
    return topics.map((topic) => topic.toJSON());
  }

  async getTopicCount(): Promise<number> {
    const totalTopics = await Topic.count()
    return totalTopics;
  }

  async update(id: number, item: Partial<TopicAttributes>): Promise<boolean> {
    const [updatedRows] = await Topic.update(item, { where: { id } });
    return updatedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await Topic.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

export default TopicDAO;
