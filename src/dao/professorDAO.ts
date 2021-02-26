import { getRepository } from 'typeorm';
import Professor from '../models/professor';
import CreateProfessorDTO from './dto/CreateProfessorDTO';

abstract class ProfessorDAO {
    public static async create({
        nome,
        sexo,
    }: CreateProfessorDTO): Promise<Professor | undefined> {
        const professorRepository = getRepository(Professor);
        nome = nome.trim().toUpperCase();
        sexo = sexo.trim().toUpperCase();
        const professor = professorRepository.create({ nome, sexo });
        await professorRepository.save(professor);
        if (professor) {
            return professor;
        }
        return undefined;
    }

    public static async findById({
        id,
    }: Pick<Professor, 'id'>): Promise<Professor | undefined> {
        const professorRepository = getRepository(Professor);
        const professor = await professorRepository.findOne(id);
        if (professor) {
            return professor;
        }

        return undefined;
    }

    public static async removeById({
        id,
    }: Pick<Professor, 'id'>): Promise<void> {}
}

export default ProfessorDAO;
