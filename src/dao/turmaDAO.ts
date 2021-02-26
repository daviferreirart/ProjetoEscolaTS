import { getRepository } from 'typeorm';
import AppError from '../error/AppError';
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
    }: CreateTurmaDTO): Promise<Turma | undefined> {
        const professor = await ProfessorDAO.findById({ id: professorId });
        if (!professor) {
            throw new AppError('Professor não encontrado!');
        }
        const disciplina = await DisciplinaDAO.findById({ id: disciplinaId });
        if (!disciplina) {
            throw new AppError('Disciplina não encontrada!');
        }
        const turmaRepository = getRepository(Turma);

        const turma = turmaRepository.create({
            professor,
            disciplina,
            semestre,
            ano,
        });
        await turmaRepository.save(turma);
        return turma;
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

    public static async removeById(id: number): Promise<void> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `DELETE FROM TURMA WHERE ID = ${id}`,
        );
        const resultado = rs[0].affectedRows;
        if (resultado > 0) {
            console.log('A turma foi removida!');
        } else {
            console.log('Nenhuma turma com este id foi encontrada!');
        }
    }
}

export default TurmaDAO;
