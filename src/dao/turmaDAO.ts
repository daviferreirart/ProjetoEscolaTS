import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Database from '../database/database';
import Disciplina from '../models/disciplina';
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

    public static async findById(id: number): Promise<Turma | null> {
        const rs = await Database.connection.query<RowDataPacket[]>(
            `SELECT * FROM TURMA WHERE ID = ${id}`,
        );
        const resultado = rs[0][0];
        if (resultado) {
            const turma = new Turma(
                resultado.ID,
                resultado.PROFESSORID,
                resultado.DISCIPLINAID,
                resultado.SEMESTRE,
                resultado.ANO,
            );
            return turma;
        }
        return null;
    }
}

export default TurmaDAO;
