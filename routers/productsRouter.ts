import { Router } from "express";
import { ProductController } from "../controllers/";

const productController = new ProductController();
const router = Router();

router.get("/search", productController.searchProduct);
router.get("/recent", productController.getRecentProducts);
router.get("/filter", productController.getAllFilteredProducts);

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
