import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';
import { Topic } from './Topic';
import { UserCompletedProblem } from './UserCompletedProblem';

// Define the interface for the Problem model attributes
interface ProblemAttributes {
  id: number;
  problem_statement: string;
  topic_id: number;
  youtube_tutorial_link?: string;
  leetcode_link?: string;
  article_link?: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for the input object when creating a new Problem
interface ProblemCreationAttributes extends Optional<ProblemAttributes, 'id'> {}

class Problem extends Model<ProblemAttributes, ProblemCreationAttributes> implements ProblemAttributes {
  public id!: number;
  public problem_statement!: string;
  public topic_id!: number;
  public youtube_tutorial_link?: string;
  public leetcode_link?: string;
  public article_link?: string;
  public difficulty_level!: 'easy' | 'medium' | 'hard';
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the Problem model
Problem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    problem_statement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'topics', // reference to Topic model
        key: 'id',
      },
      allowNull: false,
    },
    youtube_tutorial_link: {
      type: DataTypes.STRING,
    },
    leetcode_link: {
      type: DataTypes.STRING,
    },
    article_link: {
      type: DataTypes.STRING,
    },
    difficulty_level: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'problems',
  }
);

// Define associations
Problem.belongsTo(Topic, { foreignKey: 'topic_id' });
Problem.hasMany(UserCompletedProblem, { foreignKey: 'problem_id', as: "user_completed" });
Topic.hasMany(Problem, { foreignKey: 'topic_id' });
export { Problem, ProblemAttributes, ProblemCreationAttributes };
