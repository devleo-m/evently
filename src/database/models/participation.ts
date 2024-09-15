import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";
import User from "./user";
import Event from "./event";

class Participation extends Model {
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