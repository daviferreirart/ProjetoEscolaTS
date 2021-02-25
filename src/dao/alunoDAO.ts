import { getRepository } from 'typeorm';
import Aluno from '../models/aluno';
import CreateAlunoDTO from './dto/CreateAlunoDTO';

abstract class AlunoDAO {
    public static async create({
        nome,
        sexo,
    }: CreateAlunoDTO): Promise<Aluno | undefined> {
        const alunoRepository = getRepository(Aluno);
        nome = nome.trim().toUpperCase();
        sexo = sexo.trim().toUpperCase();
        const aluno = alunoRepository.create({ nome, sexo });
        await alunoRepository.save(aluno);
        if (aluno) {
            return aluno;
        }
        return undefined;
    }

    public static async findById({
        id,
    }: Pick<Aluno, 'id'>): Promise<Aluno | undefined> {
        const alunoRepository = getRepository(Aluno);
        const aluno = await alunoRepository.findOne(id);
        if (aluno) {
            return aluno;
        }
        return undefined;
    }

    public static async removeById({
        id,
    }: Pick<Aluno, 'id'>): Promise<boolean> {
        const alunoRepository = getRepository(Aluno);
        const rs = await alunoRepository.delete(id);

        if (rs.affected) return rs.affected > 0;

        return false;
    }

    public static async update(
        id: string,
        { nome, sexo }: Partial<Omit<Aluno, 'matricula'>>,
    ): Promise<Aluno | undefined> {}
}
export default AlunoDAO;
