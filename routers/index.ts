import { NextFunction, Request, Response, Router } from "express";
import authRouter from "./authRouter";
import productsRouter from "./productsRouter";
import { AuthError } from "../errors";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productsRouter);

router.use("/*", (_, res) => {
  res.status(404).json({ statusCode: 404, error: "Undefined Request!" });
});

router.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const exception = err as AuthError;
  res.status(exception.status ? exception.status : 500).json({
    statusCode: exception.status ? exception.status : 500,
    error: exception.message ? exception.message : "Internal Server Error",
  });
});

export default router;
