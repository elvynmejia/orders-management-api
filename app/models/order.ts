import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import db from "./../db";

import { Address, createAddress, addressWithoutId } from "./../models/address";
import { createShipment, Shipment } from "./../models/shipment";

export interface Order {
  id: number;
  product_id: number;
  quantity: number;
  status: string;
}

export type OrderWithoutId = Omit<Order, "id">;

export type fullOrder = {
  product_id?: number;
  quantity: number;
  destination_address: addressWithoutId;
  origin_address: addressWithoutId;
  tracking_number: string;
  tracking_company: string;
  status: string;
};

@Entity()
export class Orders extends BaseEntity {
  constructor(order: OrderWithoutId) {
    super();
    Object.assign(this, order);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  status: string;
}

const getOrders = async (): Promise<Order[]> => {
  return await db.getRepository(Orders).find();
};

const createOrder = async (
  orderParams: fullOrder,
): Promise<{
  shipment: Shipment;
  order: Order;
  origin_address: Address;
  destintion_address: Address;
}> => {
  const destinationAddress = await createAddress(
    orderParams.destination_address,
  );
  const originAddress = await createAddress(orderParams.origin_address);

  // support shipment.parcel
  const order = await db.getRepository(Orders).save({
    product_id: orderParams.product_id,
    quantity: orderParams.quantity,
    status: orderParams.status,
  });

  const shipment = await createShipment({
    order_id: order.id,
    tracking_company: orderParams.tracking_company,
    tracking_number: orderParams.tracking_number,
    status: orderParams.status,
    destination_address_id: destinationAddress.id,
    origin_address_id: originAddress.id,
  });

  return {
    shipment,
    order,
    destintion_address: destinationAddress,
    origin_address: originAddress,
  };
};

const updateOrder = async (
  order: Order,
  fieldsToUpdate: Order,
): Promise<Order> => {
  return await db.getRepository(Orders).save(fieldsToUpdate);
};

const findOrderById = async (id: number): Promise<Order | null> => {
  return await db.getRepository(Orders).findOneBy({ id: id });
};

export { getOrders, createOrder, updateOrder, findOrderById };
