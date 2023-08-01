import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToOrder1690930546185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE orders ADD status VARCHAR(50) NOT NULL",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE orders DROP COLUMN status");
  }
}
