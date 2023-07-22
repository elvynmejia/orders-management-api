import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrders1689898983590 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS orders(
            id INT PRIMARY KEY AUTO_INCREMENT,
            product_id INT NOT NULL,
            CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id),
            quantity INT NOT NULL
        )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE products'
    );
  }
}
