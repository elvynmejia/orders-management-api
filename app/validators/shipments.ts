import Joi from "joi";

import { Request, Response, NextFunction } from "express";

const shipmentValidatorSchema = Joi.object({
    tracking_company: Joi.string().required(),
    tracking_number: Joi.string().required(),
    status: Joi.string().required(),
  });
  
  const validatorMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { error } = shipmentValidatorSchema.validate({
      tracking_company: req.body.tracking_company,
      tracking_number: req.body.tracking_number,
      status: req.body.status,
    });
  
    if (error) {
      return next(error);
    }
  
    next();
  };

  export default validatorMiddleware;