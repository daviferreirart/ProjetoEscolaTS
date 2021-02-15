import { ResultSetHeader } from 'mysql2/promise';
import Database from '../database/database';
import Disciplina from '../models/disciplina';
import CreateDisciplonaDTO from './dto/CreateDisciplinaDTO';

abstract class DisciplinaDAO {
    public static async create({
        nome,
    }: CreateDisciplonaDTO): Promise<Disciplina> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `INSERT INTO DISCIPLINAS(NOME) VALUES (${nome})`
                .trim()
                .toUpperCase(),
        );
        const disciplina = new Disciplina(rs[0].insertId, nome);
        return disciplina;
    }
}
export default DisciplinaDAO;
