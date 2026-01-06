import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1767727396565 implements MigrationInterface {
    name = 'Default1767727396565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_2e12fef9c7f6e1533b7fa6e62ff"`);
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "climateId"`);
        await queryRunner.query(`ALTER TABLE "climate" ADD "cityId" integer`);
        await queryRunner.query(`ALTER TABLE "climate" ADD CONSTRAINT "FK_c213f44be3ab9b6247f358747aa" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "climate" DROP CONSTRAINT "FK_c213f44be3ab9b6247f358747aa"`);
        await queryRunner.query(`ALTER TABLE "climate" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "city" ADD "climateId" integer`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_2e12fef9c7f6e1533b7fa6e62ff" FOREIGN KEY ("climateId") REFERENCES "climate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
