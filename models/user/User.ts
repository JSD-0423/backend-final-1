import {
  Model,
  DataTypes,
  CreationOptional,
  HasManyAddAssociationMixin,
} from "sequelize";
import Database from "../../database/Database";
import { Cart, Order } from "..";

class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare password: string;
  declare email: string;
  declare picture: string;
  declare cartId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue:
        "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png",
    },
    cartId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: "carts",
        key: "id",
      },
    },
  },
  {
    modelName: "users",
    sequelize: Database.getInstance(),
  }
);

export default User;
