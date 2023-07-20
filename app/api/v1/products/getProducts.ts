import { Request, Response, NextFunction } from 'express';
import { getProducts } from '../../../models/product';

const getProductsControler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        return res.json({ products }).status(200);
    } catch (error) {
        return next(error);
    }
}

export default getProductsControler;