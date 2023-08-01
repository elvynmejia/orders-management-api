import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import db from "./../db";

/*
+------------------------+--------------+------+-----+---------+----------------+
| Field                  | Type         | Null | Key | Default | Extra          |
+------------------------+--------------+------+-----+---------+----------------+
| id                     | int          | NO   | PRI | NULL    | auto_increment |
| order_id               | int          | NO   | MUL | NULL    |                |
| tracking_company       | varchar(255) | NO   |     | NULL    |                |
| tracking_number        | varchar(255) | NO   |     | NULL    |                |
| status                 | varchar(255) | NO   |     | NULL    |                |
| destination_address_id | int          | NO   | MUL | NULL    |                |
| origin_address_id      | int          | NO   | MUL | NULL    |                |
+------------------------+--------------+------+-----+---------+----------------+
  */
export interface Shipment {
  id: number;
  order_id: number;
  tracking_company: string;
  tracking_number: string;
  status: string;
  destination_address_id: number;
  origin_address_id: number;
}

export type ShipmentWithoutId = Omit<Shipment, "id">;

@Entity()
export class Shipments extends BaseEntity {
  constructor(shipment: Shipment) {
    super();
    Object.assign(this, shipment);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  tracking_company: string;

  @Column()
  tracking_number: string;

  @Column()
  status: string;

  @Column()
  destination_address_id: number;

  @Column()
  origin_address_id: number;
}

const getShipments = async (): Promise<Shipment[]> => {
  return await db.getRepository(Shipments).find();
};

const createShipment = async (
  shipment: ShipmentWithoutId,
): Promise<Shipment> => {
  return await db.getRepository(Shipments).save(shipment);
};

const updateShipment = async (
  shipment: Shipment,
  fieldsToUpdate: Shipment,
): Promise<Shipment> => {
  return await db.getRepository(Shipments).save(fieldsToUpdate);
};

const findShipmentById = async (id: number): Promise<Shipment | null> => {
  return await db.getRepository(Shipments).findOneBy({ id: id });
};

const findShipmentByIdOrderId = async (
  order_id: number,
): Promise<Shipment | null> => {
  return await db.getRepository(Shipments).findOneBy({ order_id: order_id });
};

export {
  getShipments,
  createShipment,
  updateShipment,
  findShipmentById,
  findShipmentByIdOrderId,
};
