import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedDefaultValues1759414687840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO \`events\` (\`name\`, \`totalSeats\`) VALUES ('Concert', 100), ('Workshop', 50), ('Seminar', 30), ('Conference', 200)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM \`events\` WHERE \`name\` IN ('Concert', 'Workshop', 'Seminar', 'Conference')
    `)
  }
}
