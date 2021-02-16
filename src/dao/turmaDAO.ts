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
        semestre,
        ano,
    }: CreateTurmaDTO): Promise<Turma | null> {
        const professor = await ProfessorDAO.findById(professorId);
        const disciplina = await DisciplinaDAO.findById(disciplinaId);

        if (professor && disciplina) {
            const rs = await Database.connection.query<ResultSetHeader>(`
                INSERT INTO TURMA(PROFESSORID,DISCIPLINAID,SEMESTRE,ANO) VALUES (
                ${professorId}, ${disciplinaId},${semestre},${ano})`);
            const turma = new Turma(
                rs[0].insertId,
                professorId,
                disciplinaId,
                semestre,
                ano,
            );
            return turma;
        }
        return null;
    }
}

export default TurmaDAO;
