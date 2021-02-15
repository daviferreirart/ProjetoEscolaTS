import { ResultSetHeader } from 'mysql2';
import Database from '../database/database';
import Disciplina from '../models/disciplina';
import Turma from '../models/turma';
import CreateTurmaDTO from './dto/CreateTurmaDTO';

abstract class TurmaDAO {
    public static async create({
        professorID,
        disciplinaID,
        semestre,
    }: CreateTurmaDTO): Promise<Turma> {
        const rs = await Database.connection.query<ResultSetHeader>(`
        INSERT INTO TURMA(PROFESSORID,DISCIPLINAID,SEMESTRE) VALUES (
        ${professorID},${disciplinaID},${semestre}`);
        const turma = new Turma(rs[0].insertId);
    }
}
export default TurmaDAO;
