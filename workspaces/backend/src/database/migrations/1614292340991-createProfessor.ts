import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createProfessor1614292340991
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'professor',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        length: '14',
                        isUnique: true,
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
        await queryRunner.dropTable('professor');
    }
}
