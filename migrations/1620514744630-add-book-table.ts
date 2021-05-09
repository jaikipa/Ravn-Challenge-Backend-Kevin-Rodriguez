import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBookTable1620514744630 implements MigrationInterface {
  name = 'addBookTable1620514744630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."books" ("id" SERIAL NOT NULL, "isbn" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" integer, CONSTRAINT "UQ_28a73cf7594bcb4ca5c3d61fa5b" UNIQUE ("isbn"), CONSTRAINT "PK_f3f6925f444530b906b67edf63e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."books" ADD CONSTRAINT "FK_0406b29708b2979ce516d192c40" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."books" DROP CONSTRAINT "FK_0406b29708b2979ce516d192c40"`);
    await queryRunner.query(`DROP TABLE "public"."books"`);
  }
}
