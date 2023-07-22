import {
  Entity,
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity
} from 'typeorm';
  
import db from './../db';
  
export interface Order {
    id: number;
    product_id: number;
    quantity: number;
  }

export type OrderWithoutId = Omit<Order, 'id'>;
  
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
}
  
const getOrders = async (): Promise<Order[]> => {
  return await db.getRepository(Orders).find();
};
  
const createOrder = async (order: OrderWithoutId): Promise<Order> => {
  return await db.getRepository(Orders).save(order);
};
  
const updateOrder = async (order: Order, fieldsToUpdate: Order): Promise<Order> => {
  return await db.getRepository(Orders).save(fieldsToUpdate);
};
  
const findOrderById = async (id: number): Promise<Order | null> => {
  return await db.getRepository(Orders).findOneBy({ id: id });
};
  
export {
  getOrders,
  createOrder,
  updateOrder,
  findOrderById
};