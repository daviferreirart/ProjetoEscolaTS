import { getRepository } from 'typeorm';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import Aluno from '../models/aluno';
import CreateAlunoDTO from './dto/CreateAlunoDTO';
import AppError from '../error/AppError';

abstract class AlunoDAO {
    public static async create({
        nome,
        sexo,
        cpf,
    }: CreateAlunoDTO): Promise<Aluno | undefined> {
        const alunoRepository = getRepository(Aluno);
        nome = nome.trim().toUpperCase();
        sexo = sexo.toUpperCase();

        if (!cpfValidator.isValid(cpf)) {
            throw new AppError('CPF invalido');
        }

        const aluno = alunoRepository.create({
            nome,
            sexo,
            cpf: cpfValidator.format(cpf),
        });
        await alunoRepository.save(aluno);
        if (aluno) {
            return aluno;
        }
        return undefined;
    }

    public static async findByCPF({
        cpf,
    }: Pick<Aluno, 'cpf'>): Promise<Aluno | undefined> {
        const alunoRepository = getRepository(Aluno);
        const aluno = await alunoRepository.findOne({
            where: { cpf: cpfValidator.format(cpf) },
        });
        if (aluno) {
            return aluno;
        }
        return undefined;
    }

    public static async removeByCPF({
        cpf,
    }: Pick<Aluno, 'cpf'>): Promise<boolean> {
        const alunoRepository = getRepository(Aluno);
        const rs = await alunoRepository.delete({
            cpf: cpfValidator.format(cpf),
        });

        if (rs.affected) return rs.affected > 0;

        return false;
    }

    public static async listAlunos(): Promise<Aluno[]> {
        const alunoRepository = getRepository(Aluno);
        const lista = await alunoRepository.find();
        return lista;
    }
}
export default AlunoDAO;
