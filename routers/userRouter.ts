import { Router } from "express";
import { UserController } from "../controllers/";

const userController = new UserController();
const router = Router();

router
  .route("/:id/favourite")
  .post(userController.addToFavourite)
  .get(userController.getFavouriteList)
  .delete(userController.removeFromFavourite);

export default router;
