import { Model, DataTypes, CreationOptional } from "sequelize";
import Database from "../../database/Database";
import { User } from "..";

class Address extends Model {
  declare id: number;
  declare streetAddress: string;
  declare city: string;
  declare state: string;
  declare pinCode: string;
  declare mobileNumber: string;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Address.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      defaultValue:
        "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png",
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    modelName: "addresses",
    sequelize: Database.getInstance(),
  }
);

Address.belongsTo(User, { as: "users", foreignKey: "userId" });
User.hasOne(Address, { as: "addresses", foreignKey: "id" });

export default Address;
