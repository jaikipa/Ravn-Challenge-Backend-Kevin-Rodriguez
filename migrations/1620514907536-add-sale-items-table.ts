import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSaleItemsTable1620514907536 implements MigrationInterface {
  name = 'addSaleItemsTable1620514907536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."sale_items" ("id" SERIAL NOT NULL, "item_price" numeric NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "book_id" integer, CONSTRAINT "CHK_749e8b5efb01d232e21657f56d" CHECK ("quantity" > 0), CONSTRAINT "CHK_c817ec6ce345b17d942dba8339" CHECK ("item_price" >= 0), CONSTRAINT "PK_70baaaa9ed869aa539f0c8b5c63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sale_items" ADD CONSTRAINT "FK_fa2ac281d6d5766c58ee9c08591" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."sale_items" DROP CONSTRAINT "FK_fa2ac281d6d5766c58ee9c08591"`);
    await queryRunner.query(`DROP TABLE "public"."sale_items"`);
  }
}
