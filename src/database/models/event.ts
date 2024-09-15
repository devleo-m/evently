import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import User from './user';

class Event extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public event_date!: string;
  public creator_id!: number;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    event_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'Event',
    timestamps: false,
  }
);

User.hasMany(Event, { 
    foreignKey: 'creator_id',
    as: 'events',
});

Event.belongsTo(User, { 
    foreignKey: 'creator_id',
    as: 'user',
});

export default Event;