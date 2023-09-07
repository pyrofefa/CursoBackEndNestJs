import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694120002002 implements MigrationInterface {
    name = 'Migration1694120002002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_products_product\` (\`categoryId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_90d521137ff8c3e927187bcd27\` (\`categoryId\`), INDEX \`IDX_ee240b247f9f23e5d35854c186\` (\`productId\`), PRIMARY KEY (\`categoryId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category_products_product\` ADD CONSTRAINT \`FK_90d521137ff8c3e927187bcd27d\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_products_product\` ADD CONSTRAINT \`FK_ee240b247f9f23e5d35854c186b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_products_product\` DROP FOREIGN KEY \`FK_ee240b247f9f23e5d35854c186b\``);
        await queryRunner.query(`ALTER TABLE \`category_products_product\` DROP FOREIGN KEY \`FK_90d521137ff8c3e927187bcd27d\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee240b247f9f23e5d35854c186\` ON \`category_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_90d521137ff8c3e927187bcd27\` ON \`category_products_product\``);
        await queryRunner.query(`DROP TABLE \`category_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
