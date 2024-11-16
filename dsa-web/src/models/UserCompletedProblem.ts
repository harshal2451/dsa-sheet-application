// models/UserCompletedProblem.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

// import { Problem } from './Problem'; // Ensure this is correctly imported

interface UserCompletedProblemAttributes {
  id: number;
  user_id: number;
  problem_id: number;
  topic_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCompletedProblemCreationAttributes extends Optional<UserCompletedProblemAttributes, 'id'> {}

class UserCompletedProblem extends Model<UserCompletedProblemAttributes, UserCompletedProblemCreationAttributes> implements UserCompletedProblemAttributes {
  public id!: number;
  public user_id!: number;
  public problem_id!: number;
  public topic_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserCompletedProblem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Make sure 'users' table exists
        key: 'id',
      },
      allowNull: false,
    },
    problem_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'problems', // Ensure 'problems' table exists
        key: 'id',
      },
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'topics', // Ensure 'topics' table exists
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'user_completed_problems',
  }
);

// Associations should be defined after all models are initialized
// UserCompletedProblem.belongsTo(Problem, { foreignKey: 'problem_id'});

export { UserCompletedProblem, UserCompletedProblemAttributes, UserCompletedProblemCreationAttributes };
