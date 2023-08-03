import dotenv from "dotenv";

dotenv.config({ path: "./../.env" });

import "reflect-metadata";

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import db from "db";
import errorHandler from "./errorHandler";
import getProductsControler from "api/v1/products/getProducts";
import createProductControler from "api/v1/products/createProduct";
import updateProductControler from "api/v1/products/updateProduct";
import createProducOrderController from "api/v1/products/createProductOrder";
import updateShipmentController from "api/v1/orders/updateShipment";
import updateOrderStatusController from "api/v1/orders/updateOrderStatus";
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));

// the order or db initialization matters
db.initialize()
  .then(() => {
    console.log("database has been successfully initialized!");
  })
  .catch((err: any) => {
    throw err;
  });

app.get("/api/v1/products", getProductsControler);
app.post("/api/v1/products", createProductControler);
app.patch("/api/v1/products/:id", updateProductControler);
app.post("/api/v1/products/:id/orders", createProducOrderController);
app.patch("/api/v1/orders/:id/shipments", updateShipmentController);
app.patch("/api/v1/orders/:id/update_status", updateOrderStatusController);

app.get("/health", (req: Request, res: Response) => {
  res.send("Ok!!");
});

app.use(errorHandler);

export default app;
