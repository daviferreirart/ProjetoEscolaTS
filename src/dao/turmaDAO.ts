import { ResultSetHeader } from 'mysql2/promise';
import Database from '../database/database';
import Turma from '../models/turma';
import DisciplinaDAO from './disciplinaDAO';
import CreateTurmaDTO from './dto/CreateTurmaDTO';
import ProfessorDAO from './professorDAO';

abstract class TurmaDAO {
    public static async create({
        professorId,
        disciplinaId,
    }: CreateTurmaDTO): Promise<Turma | null> {
        const rs = await Database.connection.query<ResultSetHeader>(`
        INSERT INTO TURMA(PROFESSORID,DISCIPLINAID) VALUES (
        ${professorId},${disciplinaId})`);
        const professor = await ProfessorDAO.findById(professorId);

        const disciplina = await DisciplinaDAO.findById(disciplinaId);
        if (professor && disciplina) {
            console.log('FUNFOU');
            const turma = new Turma(rs[0].insertId, professorId, disciplinaId);
            return turma;
        }
        return null;
    }
}

export default TurmaDAO;
