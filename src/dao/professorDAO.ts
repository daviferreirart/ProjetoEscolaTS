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
    }: Pick<Professor, 'id'>): Promise<void> {
        try {
            const rs = await Database.connection.query<ResultSetHeader>(
                `DELETE FROM PROFESSOR WHERE ID = ${id}`,
            );
            const resultado = rs[0].affectedRows;
            if (resultado > 0) {
                console.log('Professor removido com sucesso!');
            } else {
                console.log('Nenhum professor foi encontrado');
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                    console.log(
                        'Não foi possivel remover o professor, ele está vinculado a alguma turma!',
                    );
                } else {
                    console.log('Erro ao remover o professor!');
                }
            }
        }
    }
}

export default ProfessorDAO;
