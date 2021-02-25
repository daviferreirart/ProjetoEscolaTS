import { getRepository } from 'typeorm';
import Aluno from '../models/aluno';
import Disciplina from '../models/disciplina';
import CreateDisciplonaDTO from './dto/CreateDisciplinaDTO';

abstract class DisciplinaDAO {
    public static async create({
        nome,
    }: CreateDisciplonaDTO): Promise<Disciplina | undefined> {
        const disciplinaRepository = getRepository(Disciplina);
        nome = nome.trim().toUpperCase();
        const disciplina = disciplinaRepository.create({ nome });
        await disciplinaRepository.save(disciplina);
        if (disciplina) {
            return disciplina;
        }
        return undefined;
    }

    public static async findById({
        id,
    }: Pick<Aluno, 'id'>): Promise<Disciplina | undefined> {
        const disciplinaRepository = getRepository(Disciplina);
        const disciplina = await disciplinaRepository.findOne(id);
        if (disciplina) {
            return disciplina;
        }

        return undefined;
    }

    public static async removeById({
        id,
    }: Pick<Disciplina, 'id'>): Promise<boolean> {
        const disciplinaRepository = getRepository(Disciplina);
        const rs = await disciplinaRepository.delete(id);
        if (rs.affected) {
            return rs.affected > 0;
        }
        return false;
    }
}
export default DisciplinaDAO;
