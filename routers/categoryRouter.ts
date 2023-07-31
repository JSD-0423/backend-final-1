import { Router } from "express";
import { CategoryController } from "../controllers/";

const categoryController = new CategoryController();
const router = Router();

router.get("/handpick", categoryController.getHandPickedProduct);

router
  .route("/")
  .get(categoryController.readAllCategories)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.readCategory)
  .delete(categoryController.deleteCategory)
  .patch(categoryController.updateCategory);

export default router;
