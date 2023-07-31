import { Op } from "sequelize";
import { Category, Favorite, Product } from "../../models";
import { CategoryInterface, FilterOptionsInterface } from "../../interfaces";

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

export async function createCategory(category: CategoryInterface) {
  const categoryId = await Category.create({ ...category });
  return categoryId;
}

export async function readCategoryByName(
  category: string
): Promise<Category | null> {
  const categoryObj = await Category.findOne({ where: { category } });
  return categoryObj;
}

export async function readAllCategories(
  offset: number,
  limit: number
): Promise<Category[]> {
  const categoryObj = await Category.findAll({ limit, offset });
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
  const filteredProducts = await Product.findAndCountAll({
    limit,
    where: { ...options },
    order: [[orderBy, order]],
    offset,
  });
  return filteredProducts;
}

export async function readUserFavourite(
  offset: number,
  limit: number,
  id: number
): Promise<{ rows: Product[]; count: number } | null> {
  const favourite = await Favorite.findByPk(id);
  if (!favourite) return null;
  const favProducts = await Product.findAndCountAll({
    where: { id: favourite.productsIds },
  });
  return favProducts;
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
