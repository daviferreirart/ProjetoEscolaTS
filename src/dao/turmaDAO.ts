import { ResultSetHeader } from 'mysql2/promise';
import Database from '../database/database';
import Disciplina from '../models/disciplina';
import Turma from '../models/turma';
import DisciplinaDAO from './disciplinaDAO';
import CreateTurmaDTO from './dto/CreateTurmaDTO';
import ProfessorDAO from './professorDAO';

abstract class TurmaDAO {
    public static async create({
        professorID,
        disciplinaID,
    }: CreateTurmaDTO): Promise<Turma> {
        const rs = await Database.connection.query<ResultSetHeader>(`
        INSERT INTO TURMA(PROFESSORID,DISCIPLINAID) VALUES (
        ${professorID},${disciplinaID}`);
        const professorId = await ProfessorDAO.findById(professorID);
        const disciplinaId = await DisciplinaDAO.findById(disciplinaID);
        const turma = new Turma(rs[0].insertId, professorId, disciplinaId);
        return turma;
    }
}

export default TurmaDAO;
