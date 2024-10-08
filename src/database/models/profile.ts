import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../../config/database";
import User from "./user";

export interface ProfileAttributes {
  id: number;
  name: string;
  bio?: string;
  birth_date?: Date;
  user_id: number;
}

export interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id' | 'bio' | 'birth_date'> {}

class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes  {
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
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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
