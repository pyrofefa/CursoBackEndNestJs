import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1694640560994 implements MigrationInterface {
  name = 'Init1694640560994';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`brand_id\` int NULL, INDEX \`IDX_4fbc36ad745962e5c11001e1a8\` (\`price\`, \`stock\`), UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_5f468ae5696f07da025138e38f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(100) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`customer_id\` int NULL, UNIQUE INDEX \`REL_d72eb2a5bbff4f2533a5d4caff\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(25) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`quantity\` int NOT NULL, \`productId\` int NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`category_products_products\` (\`categoryId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_ae02308c93d865ed3dbaa6097f\` (\`categoryId\`), INDEX \`IDX_414c8fc7ae52afaf7b31750fac\` (\`productsId\`), PRIMARY KEY (\`categoryId\`, \`productsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products_categories\` (\`product_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_f2c76a4306a82c696d620f81f0\` (\`product_id\`), INDEX \`IDX_19fe0fe8c2fcf1cbe1a80f639f\` (\`category_id\`), PRIMARY KEY (\`product_id\`, \`category_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d72eb2a5bbff4f2533a5d4caff9\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_904370c093ceea4369659a3c810\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_products_products\` ADD CONSTRAINT \`FK_ae02308c93d865ed3dbaa6097f8\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_products_products\` ADD CONSTRAINT \`FK_414c8fc7ae52afaf7b31750facf\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products_categories\` ADD CONSTRAINT \`FK_f2c76a4306a82c696d620f81f08\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products_categories\` ADD CONSTRAINT \`FK_19fe0fe8c2fcf1cbe1a80f639f1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products_categories\` DROP FOREIGN KEY \`FK_19fe0fe8c2fcf1cbe1a80f639f1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products_categories\` DROP FOREIGN KEY \`FK_f2c76a4306a82c696d620f81f08\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_products_products\` DROP FOREIGN KEY \`FK_414c8fc7ae52afaf7b31750facf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_products_products\` DROP FOREIGN KEY \`FK_ae02308c93d865ed3dbaa6097f8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_904370c093ceea4369659a3c810\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d72eb2a5bbff4f2533a5d4caff9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_19fe0fe8c2fcf1cbe1a80f639f\` ON \`products_categories\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f2c76a4306a82c696d620f81f0\` ON \`products_categories\``,
    );
    await queryRunner.query(`DROP TABLE \`products_categories\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_414c8fc7ae52afaf7b31750fac\` ON \`category_products_products\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ae02308c93d865ed3dbaa6097f\` ON \`category_products_products\``,
    );
    await queryRunner.query(`DROP TABLE \`category_products_products\``);
    await queryRunner.query(`DROP TABLE \`order_item\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`customer\``);
    await queryRunner.query(
      `DROP INDEX \`REL_d72eb2a5bbff4f2533a5d4caff\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5f468ae5696f07da025138e38f\` ON \`brand\``,
    );
    await queryRunner.query(`DROP TABLE \`brand\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4fbc36ad745962e5c11001e1a8\` ON \`products\``,
    );
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
