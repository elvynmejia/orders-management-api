import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShipmentsAndAddressesTables1690045692540 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE IF NOT EXISTS addresses(
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    address1 VARCHAR(255) NOT NULL,
                    address2 VARCHAR(255),
                    city VARCHAR(255) NOT NULL,
                    zip VARCHAR(255) NOT NULL,
                    state VARCHAR(255) NOT NULL,
                    country VARCHAR(255) NOT NULL
                )`
      );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS shipments(
                  id INT PRIMARY KEY AUTO_INCREMENT,
                  order_id INT NOT NULL,
                  CONSTRAINT fk_orders_id FOREIGN KEY (order_id) REFERENCES orders(id),
                  tracking_company VARCHAR(255) NOT NULL,
                  tracking_number VARCHAR(255) NOT NULL,
                  status VARCHAR(255) NOT NULL,
                  destination_address_id INT NOT NULL,
                  origin_address_id INT NOT NULL,
                  CONSTRAINT fk_destination_address_id FOREIGN KEY (destination_address_id) REFERENCES addresses(id),
                  CONSTRAINT fk_origin_address_id FOREIGN KEY (origin_address_id) REFERENCES addresses(id)
              )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE shipments'
    );

    await queryRunner.query(
      'DROP TABLE addresses'
    );
  }
}
