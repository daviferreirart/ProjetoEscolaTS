import { ResultSetHeader } from 'mysql2/promise';
import Database from '../database/database';
import Aluno from '../models/aluno';
import CreateAlunoDTO from './dto/CreateAlunoDTO';

abstract class AlunoDAO {
    public static async create({
        nome,
        sexo,
    }: CreateAlunoDTO): Promise<Aluno | null> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `INSERT INTO ALUNOS(NOME,SEXO) VALUE('${nome
                .trim()
                .toUpperCase()}','${sexo.trim().toUpperCase()}');`,
        );
        if (rs[0].insertId) {
            const aluno = new Aluno(rs[0].insertId, nome, sexo);
            return aluno;
        }
        return null;
    }
}
export default AlunoDAO;
