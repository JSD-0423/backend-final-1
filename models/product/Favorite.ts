import { Model, DataTypes } from "sequelize";
import Database from "../../database/Database";

class Favorite extends Model {
  declare id: number;
  declare userId: number;
  declare productsIds: number[];
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
    productsIds: {
      type: DataTypes.JSON,
    },
  },

  {
    modelName: "favorites",
    sequelize: Database.getInstance(),
  }
);

export default Favorite;
