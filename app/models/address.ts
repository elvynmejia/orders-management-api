import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import db from "db";

/*
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| address1 | varchar(255) | NO   |     | NULL    |                |
| address2 | varchar(255) | YES  |     | NULL    |                |
| city     | varchar(255) | NO   |     | NULL    |                |
| zip      | varchar(255) | NO   |     | NULL    |                |
| state    | varchar(255) | NO   |     | NULL    |                |
| country  | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
*/
export interface Address {
  id: number;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  state: string;
  country: string;
}

export type addressWithoutId = Omit<Address, "id">;

@Entity()
export class Addresses extends BaseEntity {
  constructor(address: Address) {
    super();
    Object.assign(this, address);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  city: string;

  @Column()
  zip: string;

  @Column()
  state: string;

  @Column()
  country: string;
}

const getAddresses = async (): Promise<Address[]> => {
  return await db.getRepository(Addresses).find();
};

const createAddress = async (address: addressWithoutId): Promise<Address> => {
  return await db.getRepository(Addresses).save(address);
};

const updateAddress = async (
  address: Address,
  fieldsToUpdate: Address,
): Promise<Address> => {
  return await db.getRepository(Addresses).save(fieldsToUpdate);
};

const findAddressById = async (id: number): Promise<Address | null> => {
  return await db.getRepository(Addresses).findOneBy({ id: id });
};

export { getAddresses, createAddress, updateAddress, findAddressById };
