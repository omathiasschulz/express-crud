import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProdutorMigration1731811569151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create type enum_culturas as enum ('soja', 'milho', 'algodao', 'cafe', 'cana_acucar');
        create table produtor (
          id serial primary key,
          cpf_cnpj varchar(14) not null,
          nome varchar(100) not null,
          cidade varchar(100) not null,
          sigla_uf char(2) not null,
          nome_fazenda varchar(100) not null,
          total_ha_fazenda numeric(10, 2) not null,
          total_agricultavel_ha_fazenda numeric(10, 2) not null,
          total_vegetacao_ha_fazenda numeric(10, 2) not null,
          culturas_fazenda enum_culturas[] not null,
          created_at timestamp not null default now(),
          updated_at timestamp not null default now(),
          deleted boolean default false
        );
      `),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `drop table produtor; drop type enum_culturas;`,
      undefined,
    );
  }
}
