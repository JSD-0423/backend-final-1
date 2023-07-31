import { Request, Response, NextFunction } from "express";
import { DatabaseError, AuthError } from "../errors/";
import { Credentials, User } from "../models";
import { userSchema, credentialsSchema } from "../validators/";
import { readUserByEmail, createUser } from "../database/queries";
import AuthHelpers, { hashPassword, checkPassword } from "../helpers/";

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials: Credentials = req.body;
      const { error } = await credentialsSchema.validate(credentials);
      if (error)
        throw new AuthError(
          "Wrong credentials: " + error.details[0].message,
          400
        );
      const user = await readUserByEmail(credentials.email);
      if (!user) throw new AuthError("Wrong email or password", 400);
      const match = checkPassword(credentials.password, user.password);
      if (!match) throw new AuthError("Wrong email or password", 400);
      const token = await AuthHelpers.createToken(user.id);
      if (!token) throw new AuthError("Token Generation Error", 500);
      res.json({ status: 200, message: "Logged in successfully", token });
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body;
      const { error } = userSchema.validate(user);
      if (error)
        throw new AuthError(
          "Wrong credentials: " + error.details[0].message,
          400
        );
      const userHash = hashPassword(user);
      const id = await createUser(userHash);
      if (!id) throw new AuthError("User did not created", 500);
      if (id === -1) throw new AuthError("User already exists", 400);
      const token = await AuthHelpers.createToken(user.id);
      if (!token) throw new AuthError("Token Generation Error", 500);
      res.status(201).json({ status: 201, message: "user created", token });
    } catch (error) {
      next(error);
    }
  }

  addToFavourite(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getFavouriteList(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  removeFromFavourite(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
