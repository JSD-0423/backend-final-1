import { Request, Response, NextFunction } from "express";
import { CategoryQueries } from "../database/queries/";
import { Category } from "../models";
import { CredentialsError, DatabaseError } from "../errors";

class CategoryController {
  private static categoryQueries = new CategoryQueries();

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category: Category = req.body;
      const categoryId = await CategoryController.categoryQueries.addCategory(
        category
      );
      if (!categoryId)
        throw new DatabaseError("Error creating the category", 500);
      res.status(201).json({
        statusCode: 201,
        message: "category Created successfully",
        categoryId,
      });
    } catch (error) {
      next(error);
    }
  }

  async readCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const category = await CategoryController.categoryQueries.getCategory(id);
      if (!category)
        throw new DatabaseError("Sorry, the category does not exists", 404);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!id)
        throw new CredentialsError(
          "Please enter a valid category ID to update",
          400
        );
      const { ...newValues } = req.body;
      const updatedCategory =
        await CategoryController.categoryQueries.updateCategory(id, newValues);
      if (!updatedCategory)
        throw new DatabaseError("Category did not updated", 500);
      res
        .status(200)
        .json({ statusCode: 200, message: "Category updated Successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!id) throw new Error();
      const removedCategories =
        await CategoryController.categoryQueries.deleteCategory(id);
      if (!removedCategories)
        throw new DatabaseError("The product does not exists", 404);
      res
        .status(200)
        .json({ statusCode: 200, message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async readAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, count } = req.query;
      const limit = Number(count) || 5;
      const offset = Math.max((Number(page) || 0) - 1, 0) * limit;
      const categories =
        await CategoryController.categoryQueries.getAllCategories(
          limit,
          offset
        );
      if (!categories.rows)
        throw new DatabaseError("Sorry, there is no product to show", 404);
      res.json({
        categories: categories.rows,
        totalCategories: categories.count,
      });
    } catch (error) {
      next(error);
    }
  }

  async getHandPickedProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = Number(req.query.rating) || 0.0;
      const handpickProducts =
        await CategoryController.categoryQueries.readHandpickedCategories(
          rating
        );
      res.json(handpickProducts);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
