import { Router } from "express";
import { ProductController } from "../controllers/";

const productController = new ProductController();
const router = Router();

router.get("/handpick", productController.getHandPickedProduct);
router.get("/search", productController.searchProduct);

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .delete(productController.deleteProducts)
  .patch();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

export default router;
