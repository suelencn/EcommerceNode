import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProducts1643745103862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isGenerated: true,
                        isPrimary: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "preco",
                        type: "float",
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "quantidade",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "categoria_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name:"created_at",
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
        //Relacionamento tabela Produto x Categoria - Inserir categoria no produto
        await queryRunner.createForeignKey(
            "produtos", // <- será criado a FK nesta tabela
            new TableForeignKey({
                columnNames: ["categoria_id"], //nome da coluna que é FK na tabela produtos
                referencedColumnNames: ["id"], //nome da coluna na tabela categorias
                referencedTableName: "categorias", //nome da tabela que vai buscar a referencia
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos");
    }

}
