import { number } from 'joi';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createAlunos1614270846473 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'aluno',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        length: '14',
                        isUnique: true,
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'sexo',
                        type: 'varchar',
                        length: '1',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('aluno');
    }
}
