import { Request, Response, NextFunction } from "express";
import { GenericError } from "../errors/";
import {
  readProductById,
  readAllProducts,
  addProduct,
  readProductByName,
  deleteProducts,
  readProductByCategory,
} from "../database/queries/";
import { Product } from "../models";
import { productValidation, searchValidation } from "../validators";

class ProductController {
  async getSingleProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const product = await readProductById(id);
      if (!product) throw new GenericError("Product does not exist", 404);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProducts(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id.split(",");
    try {
      const product = await deleteProducts(id);
      if (!product) throw new GenericError("Product did not deleted", 400);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async searchProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, page, count } = req.query;
      const offset = Number(page) || 0;
      const limit = Number(count) || 20;
      const { error } = searchValidation.validate(title);
      if (error) throw new GenericError(error.message, 400);
      const products = await readProductByName(title as string, offset, limit);
      if (!products)
        throw new GenericError(
          "Sorry, there is no product with the same name",
          404
        );
      res.json({ products });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, count } = req.query;
      const offset = Number(page) || 0;
      const limit = Number(count) || 20;
      const products = await readAllProducts(offset, limit);
      if (!products.rows)
        throw new GenericError("Sorry, there is no product to show", 404);
      res.json({ products: products.rows, totalProducts: products.count });
    } catch (error) {
      next(error);
    }
  }
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product: Product = req.body;
      const { error } = productValidation.validate(product);
      if (error) throw new GenericError(error.message, 400);
      const productId = await addProduct(product);
      if (!productId)
        throw new GenericError(
          "Product did not created!, Please try again",
          500
        );
      res.status(201).json({
        statusCode: 201,
        id: productId,
        message: "Product is created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getHandPickedProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { categories } = req.query;
      const rating = Number(req.query.rating) || 0.0;
      if (!categories) throw new GenericError("Please choose a category", 400);
      const catArray = (categories as string).split(",");
      console.log("catArray", catArray);
      const handpickProducts: Product[] = await readProductByCategory(
        catArray,
        rating
      );
      res.json(handpickProducts);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
