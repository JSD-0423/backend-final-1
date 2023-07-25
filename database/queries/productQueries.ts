import { Op } from "sequelize";
import { Category, Product } from "../../models";
import { FilterOptionsInterface } from "../../interfaces";

export function readAllProducts(
  offset: number,
  limit: number
): Promise<{ rows: Product[]; count: number }> {
  return Product.findAndCountAll({ offset, limit });
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
  const products = await Product.findAll({
    limit,
    where: { title: { [Op.like]: `%${title}%` } },
    offset,
  });
  return products;
}

export async function readFilterProduct(
  filter: FilterOptionsInterface,
  offset: number,
  limit: number,
  order: string,
  orderBy: string = "id"
): Promise<{ rows: Product[]; count: number }> {
  const options = filterFactory(filter);
  console.log("options : ", options);
  const filteredProducts = await Product.findAndCountAll({
    limit,
    where: { ...options },
    order: [[orderBy, order]],
    offset,
  });
  return filteredProducts;
}

export async function readRecentProducts(
  offset: number,
  limit: number
): Promise<{ rows: Product[]; count: number }> {
  const recentProducts = await Product.findAndCountAll({
    limit,
    order: [["createdAt", "DESC"]],
    offset,
  });
  return recentProducts;
}

export async function addProduct(product: Product): Promise<number | null> {
  const productId = await Product.create({ ...product });
  return productId.id;
}

function filterFactory(filter: FilterOptionsInterface) {
  const { title, category, rating } = {
    ...filter,
  };
  const maxPrice = Number(filter.maxPrice);
  const minPrice = Number(filter.minPrice) || "0";

  const filterOptions: any = {};
  if (title) filterOptions["title"] = { [Op.like]: `%${title}%` };
  if (category) filterOptions["category"] = { [Op.like]: `%${category}%` };
  if (minPrice)
    filterOptions["price"] = { [Op.gte]: Math.max(0, Number(minPrice)) };
  if (maxPrice)
    filterOptions["price"] = {
      [Op.between]: [Math.max(0, Number(minPrice)), maxPrice],
    };
  if (rating) filterOptions["rating"] = { [Op.gte]: rating };

  return filterOptions;
}
