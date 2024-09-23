import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import User from './user';

export interface EventAttributes {
  id: number;
  title: string;
  description: string;
  event_date: Date;
  creator_id: number;
}

export interface EventCreationAttributes extends Optional<EventAttributes, 'id' | 'description'> {}

class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public event_date!: Date;
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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
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