import { Model, DataTypes, CreationOptional } from "sequelize";
import Database from "../../database/Database";
import { Product, User } from "..";

class Favorite extends Model {
  declare id: number;
  declare userId: number;
  declare productsIds: number[];
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Favorite.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    productsId: {
      type: DataTypes.INTEGER,
    },
  },

  {
    modelName: "favorites",
    sequelize: Database.getInstance(),
  }
);

Favorite.belongsTo(User, { as: "users", foreignKey: "id" });
Favorite.hasMany(Product, { as: "products", foreignKey: "id" });

export default Favorite;
