import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Database from '../database/database';
import Professor from '../models/professor';
import CreateProfessorDTO from './dto/CreateProfessorDTO';

abstract class ProfessorDAO {
    public static async create({
        nome,
        sexo,
    }: CreateProfessorDTO): Promise<Professor | null> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `INSERT INTO PROFESSOR(NOME,SEXO) VALUES ('${nome
                .trim()
                .toUpperCase()}','${sexo.trim().toUpperCase()}')`,
        );
        if (rs[0].insertId) {
            const professor = new Professor(rs[0].insertId, nome, sexo);
            return professor;
        }
        return null;
    }

    public static async findById(id: number): Promise<Professor | null> {
        const rs = await Database.connection.query<RowDataPacket[]>(
            `SELECT * FROM PROFESSOR WHERE ID = ${id}`,
        );
        const data = rs[0][0];
        if (data) {
            const professor = new Professor(data.ID, data.NOME, data.SEXO);
            console.log('Professor encontrado!');
            return professor;
        }
        console.log('Professor não encontrado');
        return null;
    }

    public static async removeById({
        id,
    }: Pick<Professor, 'id'>): Promise<void> {
        try {
            const rs = await Database.connection.query<ResultSetHeader>(
                `DELETE FROM PROFESSOR WHERE ID = ${id}`,
            );
            const resultado = rs[0].affectedRows;
            if (resultado > 0) {
                console.log('Professor removido com sucesso!');
            } else {
                console.log('Nenhum professor foi encontrado');
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                    console.log(
                        'Não foi possivel remover o professor, ele está vinculado a alguma turma!',
                    );
                } else {
                    console.log('Erro ao remover o professor!');
                }
            }
        }
    }
}
export default ProfessorDAO;
