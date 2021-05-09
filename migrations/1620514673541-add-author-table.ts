import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthorTable1620514673541 implements MigrationInterface {
  name = 'addAuthorTable1620514673541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d40c793159ff60993c821631ec9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."authors"`);
  }
}
