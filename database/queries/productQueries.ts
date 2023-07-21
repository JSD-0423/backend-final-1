import { Op } from "sequelize";
import { Category, Product } from "../../models";

export function readAllProducts(
  offset: number,
  limit: number
): Promise<{ rows: Product[]; count: number }> {
  return Product.findAndCountAll({ limit, offset });
}

export async function readProductById(id: string): Promise<Product | null> {
  const product = await Product.findByPk(id);
  return product;
}

export async function deleteProducts(id: string[]): Promise<number> {
  const deleted = await Product.destroy({ where: { id } });
  return deleted;
}

export async function readProductByCategory(
  categories: string[],
  rating: number
) {
  const products = await Product.findAll({
    where: { category: categories, rating: { [Op.gte]: rating } },
  });
  return products;
}

export async function createCategory(category: Category) {
  const categoryId = await Category.create({ ...category });
  return categoryId;
}

export async function readCategoryByName(
  category: string
): Promise<Category | null> {
  const categoryObj = await Category.findOne({ where: { category } });
  return categoryObj;
}

export async function readAllCategories(): Promise<Category[]> {
  const categoryObj = await Category.findAll();
  return categoryObj;
}

export async function readProductByName(
  title: string,
  offset: number,
  limit: number
): Promise<Product[] | null> {
  console.log("title", title);
  const products = await Product.findAll({
    limit,
    where: { title: { [Op.like]: `%${title}%` } },
    offset,
  });
  return products;
}

export async function addProduct(product: Product): Promise<number | null> {
  const productId = await Product.create({ ...product });
  return productId.id;
}
