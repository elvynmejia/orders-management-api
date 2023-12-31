import { DataSource } from "typeorm";
import { Products } from "models/product";
import { Orders } from "models/order";
import { Shipments } from "models/shipment";
import { Addresses } from "models/address";

export default new DataSource({
  type: "mysql",
  extra: {
    decimalNumbers: true,
  },
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "test",
  // entities: ["compiled/app/models/*.js"],
  entities: [Products, Orders, Shipments, Addresses],
  // entities: ['./models/*.ts'],
  migrations: ["compiled/app/migrations/*.js"],
  logging: false,
  synchronize: false,
});
