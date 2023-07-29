import { Model, DataTypes } from "sequelize";
import Database from "../../database/Database";
import Category from "./Category";

class Product extends Model {
  declare id: number;
  declare title: string;
  declare image: string;
  declare description: string;
  declare price: number;
  declare rating: number;
  declare category: string;
  declare categoryId: number;
  declare brandId: number;
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
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/4129/4129437.png",
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    modelName: "products",
    sequelize: Database.getInstance(),
  }
);

export default Product;
