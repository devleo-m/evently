import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";
import User from "./user";

class Profile extends Model {
  public id!: number;
  public name!: string;
  public bio?: string;
  public birth_date?: Date;
  public user_id!: number;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "Profile",
    timestamps: false,
  }
);

User.hasOne(Profile, {
    foreignKey: "user_id",
    as: "profile",
})

Profile.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

export default Profile;
