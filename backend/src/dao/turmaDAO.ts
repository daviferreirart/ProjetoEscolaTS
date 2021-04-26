import { getRepository } from 'typeorm';
import AppError from '../error/AppError';
import Turma from '../models/turma';
import DisciplinaDAO from './disciplinaDAO';
import CreateTurmaDTO from './dto/CreateTurmaDTO';
import ProfessorDAO from './professorDAO';

abstract class TurmaDAO {
    public static async create({
        professorCPF,
        disciplinaId,
        semestre,
        ano,
    }: CreateTurmaDTO): Promise<Turma | undefined> {
        const professor = await ProfessorDAO.findByCPF({ cpf: professorCPF });
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

    public static async findById({
        id,
    }: Pick<Turma, 'id'>): Promise<Turma | undefined> {
        const turmaRepository = getRepository(Turma);

        const turma = await turmaRepository.findOne(id);
        if (turma) {
            return turma;
        }
        return undefined;
    }

    public static async removeById({
        id,
    }: Pick<Turma, 'id'>): Promise<boolean> {
        const turmaRepository = getRepository(Turma);
        const rs = await turmaRepository.delete(id);
        if (rs.affected) {
            return rs.affected > 0;
        }
        return false;
    }

    public static async listTurmas(): Promise<Turma[]> {
        const turmaRepository = getRepository(Turma);
        const lista = await turmaRepository.find();
        return lista;
    }
}
export default TurmaDAO;
