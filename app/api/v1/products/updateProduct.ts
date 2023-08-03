import { Request, Response, NextFunction } from "express";
import { updateProduct, findProductById } from "models/product";

const updateProductsControler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const product = await findProductById(parseInt(id));

  if (product === null) {
    return res.status(404).json({
      errors: [],
      message: "Product Not found",
      code: "NOT_FOUND",
    });
  }

  try {
    // this is a little slower
    const fieldsToUpdate = Object.keys(req.body).reduce(
      (acc: any, current: any) => {
        return {
          [current]: req.body[current],
          ...acc,
        };
      },
      {},
    );

    const updatedProduct = await updateProduct(product, {
      ...product,
      ...fieldsToUpdate,
    });

    return res.status(200).json({ product: updatedProduct });
  } catch (error) {
    return next(error);
  }
};

export default updateProductsControler;
