import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1693512730645 implements MigrationInterface {
  name = 'Migration1693512730645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(100) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`customerId\` int NULL, UNIQUE INDEX \`REL_6c687a8fa35b0ae35ce766b56c\` (\`customerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_6c687a8fa35b0ae35ce766b56ce\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_6c687a8fa35b0ae35ce766b56ce\``,
    );
    await queryRunner.query(`DROP TABLE \`customer\``);
    await queryRunner.query(
      `DROP INDEX \`REL_6c687a8fa35b0ae35ce766b56c\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
