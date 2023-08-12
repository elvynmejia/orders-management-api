import { Request, Response, NextFunction } from "express";
import { createProduct } from "models/product";
import validatorMiddleware from "validators/products";

const createProductControler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { price, description, quantity } = req.body;

    const product = await createProduct({
      description,
      price,
      quantity,
    });

    return res.status(201).json({ product: product });
  } catch (error) {
    return next(error);
  }
};

export default [validatorMiddleware, createProductControler];
