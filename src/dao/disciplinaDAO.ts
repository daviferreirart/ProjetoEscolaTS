import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Database from '../database/database';
import Disciplina from '../models/disciplina';
import CreateDisciplonaDTO from './dto/CreateDisciplinaDTO';

abstract class DisciplinaDAO {
    public static async create({
        nome,
    }: CreateDisciplonaDTO): Promise<Disciplina | null> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `INSERT INTO DISCIPLINAS(NOME) VALUES ('${nome
                .trim()
                .toUpperCase()}')`,
        );
        if (rs[0].insertId) {
            const disciplina = new Disciplina(rs[0].insertId, nome);
            return disciplina;
        }
        return null;
    }

    public static async findById(id: number): Promise<Disciplina | null> {
        const rs = await Database.connection.query<RowDataPacket[]>(
            `SELECT * FROM DISCIPLINAS WHERE ID = ${id}`,
        );
        const data = rs[0][0];
        if (data.ID) {
            const disciplina = new Disciplina(data.ID, data.NOME);
            return disciplina;
        }
        return null;
    }

    public static async removeById({
        id,
    }: Pick<Disciplina, 'id'>): Promise<void> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `DELETE FROM DISCIPLINAS WHERE ID  = '${id}'`,
        );
        const resultado = rs[0].affectedRows;
        if (resultado > 0) {
            console.log('Disciplina removida com sucesso!');
        } else {
            console.log('Disciplina não encontrada!');
        }
    }
}
export default DisciplinaDAO;
