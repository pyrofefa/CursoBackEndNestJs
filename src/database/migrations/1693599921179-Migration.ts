import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693599921179 implements MigrationInterface {
    name = 'Migration1693599921179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`name\` varchar(25) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`name\` varchar(255) NOT NULL`);
    }

}
