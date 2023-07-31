import { Op } from "sequelize";
import { CategoryInterface } from "../../interfaces";
import { Category, Product } from "../../models";

class CategoryQueries {
  async getCategory(id: number) {
    const category = await Category.findByPk(id);
    return category;
  }

  async getAllCategories(limit: number = 5, offset: number = 0) {
    const categories = await Category.findAndCountAll({ limit, offset });
    return categories;
  }

  async addCategory(category: Category) {
    const createdCategory = await Category.create({ ...category });
    return createdCategory.id;
  }

  async updateCategory(id: number, category: CategoryInterface) {
    const updatedCategory = await Category.update(
      { category },
      { where: { id } }
    );
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<number> {
    const categories = await Category.destroy({ where: { id } });
    return categories;
  }

  async readHandpickedCategories(rating: number) {
    const handPicked = Category.findAll({
      include: {
        model: Product,
        as: "products",
        where: { rating: { [Op.gte]: rating } },
      },
    });
    return handPicked;
  }
}

export default CategoryQueries;
