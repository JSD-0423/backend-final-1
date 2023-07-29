export { createUser, readUserByEmail } from "./userQueries";
export {
  readProductById,
  readAllProducts,
  addProduct,
  readProductByName,
  deleteProducts,
  createCategory,
  readCategoryByName,
  readAllCategories,
  readRecentProducts,
  readFilterProduct,
} from "./productQueries";

import CategoryQueries from "./CategoryQueries";

export { CategoryQueries };
