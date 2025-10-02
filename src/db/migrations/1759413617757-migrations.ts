import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1759413617757 implements MigrationInterface {
  name = 'Migrations1759413617757'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`password\` varchar(256) NOT NULL, \`name\` varchar(256) NULL, \`email\` varchar(255) NOT NULL, \`dateCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dateUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(256) NOT NULL, \`totalSeats\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`eventId\` int NULL, UNIQUE INDEX \`IDX_4548975fcc2269622f8d1489f7\` (\`eventId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`sessions\` (\`sid\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL, \`session\` text CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL, \`expires\` int(11) NULL, PRIMARY KEY (\`sid\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_f95d476ef16fad91a50544b60c3\` FOREIGN KEY (\`eventId\`) REFERENCES \`events\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_f95d476ef16fad91a50544b60c3\``
    )
    await queryRunner.query(`DROP TABLE \`sessions\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_4548975fcc2269622f8d1489f7\` ON \`bookings\``
    )
    await queryRunner.query(`DROP TABLE \`bookings\``)
    await queryRunner.query(`DROP TABLE \`events\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``
    )
    await queryRunner.query(`DROP TABLE \`users\``)
  }
}
