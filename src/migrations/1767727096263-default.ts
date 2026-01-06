import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1767727096263 implements MigrationInterface {
    name = 'Default1767727096263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "climate" ("id" SERIAL NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, "temp_c" numeric(5,2) NOT NULL, "feelslike_c" numeric(5,2) NOT NULL, "condition_text" character varying(100) NOT NULL, "condition_code" integer NOT NULL, "humidity" integer NOT NULL, "pressure_mb" numeric(6,2) NOT NULL, "precip_mm" numeric(6,2) NOT NULL, "wind_kph" numeric(5,2) NOT NULL, "wind_degree" integer NOT NULL, "cloud" integer NOT NULL, "uv" numeric(4,2) NOT NULL, CONSTRAINT "PK_cf9a96759ebd933fe49222a78c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "region" character varying NOT NULL, "country" character varying NOT NULL, "lat" double precision NOT NULL, "lon" double precision NOT NULL, "tz_id" character varying NOT NULL, "climateId" integer, CONSTRAINT "UQ_f8c0858628830a35f19efdc0ecf" UNIQUE ("name"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_2e12fef9c7f6e1533b7fa6e62ff" FOREIGN KEY ("climateId") REFERENCES "climate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_2e12fef9c7f6e1533b7fa6e62ff"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "climate"`);
    }

}
