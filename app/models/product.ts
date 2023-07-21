import {
  Entity,
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity
} from 'typeorm';

import db from './../db';

interface Product {
  id?: number;
  description: string;
  price: number;
  quantity: number;
}

@Entity()
export class Products extends BaseEntity {
  constructor(product: Product) {
    super();
    Object.assign(this, product);
  }
  
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    description: string;

  @Column(
    'decimal', 
    { precision: 15, scale: 2 }
  )
    price: number;

  @Column()
    quantity: number;
}

const getProducts = async (): Promise<Product[]> => {
  return await db.getRepository(Products).find();
};

const createProduct = async (product: Product): Promise<Product> => {
  return await db.getRepository(Products).save(product);
};

const updateProduct = async (product: Product, fieldsToUpdate: Product): Promise<Product> => {
  return await db.getRepository(Products).save(fieldsToUpdate);
};

const findProductById = async (id: number): Promise<Product | null> => {
  return await db.getRepository(Products).findOneBy({ id: id });
};

export {
  getProducts,
  createProduct,
  updateProduct,
  findProductById
};