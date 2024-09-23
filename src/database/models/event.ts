import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import User from './user';

export interface EventAtributes {
  id: number;
  title: string;
  description: string;
  event_date: string;
  creator_id: number;
}

export interface EventCreationAttributes extends Optional<EventAtributes, 'id'> {}

class Event extends Model<EventAtributes, EventCreationAttributes> implements EventAtributes {
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