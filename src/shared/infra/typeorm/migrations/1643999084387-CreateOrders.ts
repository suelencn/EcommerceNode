import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrders1643999084387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "pedidos",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isGenerated: true,
                  isPrimary: true,
                  generationStrategy: "increment",
                },
                {
                  name: "cliente_id",
                  type: "int",
                  isNullable: true,
                },
                {
                  name: "data",
                  type: "timestamp",
                  isNullable: false,
                },
                {
                  name: "status",
                  type: "varchar",
                  isNullable: false,
                },
                {
                  name: "forma_pagamento",
                  type: "varchar",
                  isNullable: false,
                },
                {
                  name: "valor",
                  type: "float",
                  precision: 10,
                  scale: 2,
                  isNullable: false,
                },
                {
                  name: "desconto", // nome da coluna que será chave estrangeira
                  type: "float", // mesmo tipo do id da tabela categorias
                  precision: 4,
                  scale: 2,
                  isNullable: true,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            })
        );
        // cria uma nova FK na tabela pedidos
        await queryRunner.createForeignKey(
            "pedidos", // nome da tabela que será criada a FK
            new TableForeignKey({
                columnNames: ["cliente_id"], // FK na tabela pedidos
                referencedColumnNames: ["id"], // qual coluna que faz referência na outra tabela
                referencedTableName: "clientes", // tabela referência da FK
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidos");
    }

}
