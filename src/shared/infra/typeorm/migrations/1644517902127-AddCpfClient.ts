import {Column, MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCpfClient1644517902127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('clientes',
        new TableColumn(
            {
                name: "cpf",
                type: "varchar",
                length: "20",
                isNullable: true,
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('clientes', 'cpf');
    }
}
