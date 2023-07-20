import { Model, DataTypes, CreationOptional } from "sequelize";
import Database from "../../database/Database";
import { User } from "..";

class Cart extends Model {
  declare id: number;
  declare quantity?: number;
  declare date?: Date;
  declare discount?: number;
  declare total?: number;
  declare tax?: number;
  declare userId: number;
  declare productId?: number;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Cart.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.DECIMAL,
    },
    tax: {
      type: DataTypes.DECIMAL,
    },
    total: {
      type: DataTypes.DOUBLE,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "carts",
    sequelize: Database.getInstance(),
  }
);

User.hasOne(Cart, { as: "carts", foreignKey: "cartId" });
Cart.belongsTo(User, { as: "users", foreignKey: "cartId" });

export default Cart;
