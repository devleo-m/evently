import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../../config/database";
import User from "./user";
import Event from "./event";

export interface ParticipationAtributes {
  id: number;
  user_id: number;
  event_id: number;
}

export interface ParticipationCreationAttributes extends Optional<ParticipationAtributes, 'id'> {}

class Participation extends Model<ParticipationAtributes, ParticipationCreationAttributes> implements ParticipationAtributes {
  public id!: number;
  public user_id!: number;
  public event_id!: number;
}

Participation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Participation",
    tableName: "Participations",
    timestamps: false,
  }
);

User.belongsToMany(Event, {
    through: Participation,
    foreignKey: "user_id",
  });

Event.belongsToMany(User, {
  through: Participation,
  foreignKey: "event_id",
});

export default Participation;