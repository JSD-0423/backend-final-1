import { Request, Response, NextFunction } from "express";
import { GenericError } from "../errors/";
import {
  readProductById,
  readAllProducts,
  addProduct,
  readProductByName,
  deleteProducts,
  readRecentProducts,
  readFilterProduct,
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
      const limit = Number(count) || 20;
      const offset = Math.max((Number(page) || 0) - 1, 0) * limit;
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
      const limit = Number(count) || 20;
      const offset = Math.max((Number(page) || 0) - 1, 0) * limit;
      const products = await readAllProducts(offset, limit);
      if (!products.rows)
        throw new GenericError("Sorry, there is no product to show", 404);
      res.json({ products: products.rows, totalProducts: products.count });
    } catch (error) {
      next(error);
    }
  }

  async getAllFilteredProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { page, count, ...filterOptions } = req.query;
      const limit = Number(count) || 20;
      const offset = Math.max((Number(page) || 0) - 1, 0) * limit;
      const descOrder = `${req.query.orderBy}`.startsWith("-");
      const order = descOrder ? "DESC" : "ASC";
      const orderBy = descOrder
        ? `${req.query.orderBy}`.slice(1)
        : `${req.query.orderBy}`;
      const products = await readFilterProduct(
        filterOptions,
        offset,
        limit,
        order,
        orderBy
      );
      if (!products.rows)
        throw new GenericError("Sorry, there is no product to show", 404);
      res.json({ products: products.rows, totalProducts: products.count });
    } catch (error) {
      next(error);
    }
  }

  async getRecentProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, count } = req.query;
      const limit = Number(count) || 20;
      const offset = Math.max((Number(page) || 0) - 1, 0) * limit;
      const products = await readRecentProducts(offset, limit);
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
}

export default ProductController;
