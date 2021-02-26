import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTurma1614355628214 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'turma',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'disciplinaId',
                        type: 'uuid',
                    },
                    {
                        name: 'professorId',
                        type: 'uuid',
                    },
                    {
                        name: 'semestre',
                        type: 'int',
                    },
                    {
                        name: 'ano',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fk_turma_disciplina',
                        columnNames: ['disciplinaId'],
                        referencedTableName: 'disciplina',
                        referencedColumnNames: ['id'],
                    },
                    {
                        name: 'fk_turma_professor',
                        columnNames: ['professorId'],
                        referencedTableName: 'professor',
                        referencedColumnNames: ['id'],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('turma', 'fk_turma_professor');
        await queryRunner.dropForeignKey('turma', 'fk_turma_disciplina');

        await queryRunner.dropTable('turma');
    }
}
