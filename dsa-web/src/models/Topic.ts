import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';
// Define the interface for the Topic model attributes
interface TopicAttributes {
    id: number;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
// Define the interface for the input object when creating a new Topic
interface TopicCreationAttributes extends Optional<TopicAttributes, 'id'> {}

interface PaginationOption{
  page?: number;
  limit?: number;
}
class Topic extends Model<TopicAttributes, TopicCreationAttributes> implements TopicAttributes {
  public id!: number;
  public title!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'topics',
  }
);

export { Topic, TopicAttributes, TopicCreationAttributes, PaginationOption };
