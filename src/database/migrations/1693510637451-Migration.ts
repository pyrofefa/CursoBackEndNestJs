import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1693510637451 implements MigrationInterface {
  name = 'Migration1693510637451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`updateAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createAt\``);
  }
}
