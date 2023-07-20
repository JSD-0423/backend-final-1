import { Model, DataTypes } from "sequelize";
import Database from "../../database/Database";

class Product extends Model {
  declare id: number;
  declare title: string;
}

Product.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    modelName: "brands",
    sequelize: Database.getInstance(),
  }
);

export default Product;
