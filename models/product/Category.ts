import { Model, DataTypes } from "sequelize";
import Database from "../../database/Database";
import Product from "./Product";

class Category extends Model {
  declare id: number;
  declare category: string;
  declare icon: string;
  declare description: string;
}

Category.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue:
        "https://icons-for-free.com/iconfiles/png/512/bx+category-1325051853390539032.png",
    },
    description: {
      type: DataTypes.TEXT,
    },
  },

  {
    modelName: "categories",
    sequelize: Database.getInstance(),
  }
);

Category.hasMany(Product, { as: "products", foreignKey: "categoryId" });
Product.belongsTo(Category, { as: "categories", foreignKey: "id" });

export default Category;
