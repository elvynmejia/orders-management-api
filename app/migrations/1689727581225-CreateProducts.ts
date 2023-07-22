import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducts1689727581225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS products(
                id INT PRIMARY KEY AUTO_INCREMENT,
                description VARCHAR(255) NOT NULL,
                price DECIMAL(15,6) NOT NULL,
                quantity INT NOT NULL
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE products");
  }
}
