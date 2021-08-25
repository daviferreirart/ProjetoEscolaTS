import { getRepository } from 'typeorm';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import Professor from '../models/professor';
import CreateProfessorDTO from './dto/CreateProfessorDTO';
import AppError from '../error/AppError';

abstract class ProfessorDAO {
    public static async create({
        nome,
        sexo,
        cpf,
    }: CreateProfessorDTO): Promise<Professor | undefined> {
        const professorRepository = getRepository(Professor);
        nome = nome.trim().toUpperCase();
        sexo = sexo.trim().toUpperCase();
        if (!cpfValidator.isValid(cpf)) {
            throw new AppError('CPF Inválido');
        }
        const result = await professorRepository.findOne({
            where: { cpf: cpfValidator.format(cpf) },
        });
        if (result) {
            throw new AppError('CPF já cadastrado!');
        }
        const professor = professorRepository.create({
            nome,
            sexo,
            cpf: cpfValidator.format(cpf),
        });
        await professorRepository.save(professor);
        return professor;
    }

    public static async findByCPF({
        cpf,
    }: Pick<Professor, 'cpf'>): Promise<Professor | undefined> {
        const professorRepository = getRepository(Professor);
        const professor = await professorRepository.findOne({
            where: { cpf: cpfValidator.format(cpf) },
        });
        if (professor) {
            return professor;
        }

        return undefined;
    }

    public static async removeByCPF({
        cpf,
    }: Pick<Professor, 'cpf'>): Promise<boolean> {
        const professorRepository = getRepository(Professor);
        const rs = await professorRepository.delete({
            cpf: cpfValidator.format(cpf),
        });

        if (rs.affected) {
            return rs.affected > 0;
        }
        return false;
    }

    public static async listProfessores(): Promise<Professor[]> {
        const professorRepository = getRepository(Professor);
        const lista = professorRepository.find();

        return lista;
    }
}

export default ProfessorDAO;
