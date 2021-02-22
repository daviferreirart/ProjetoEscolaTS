import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
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
            console.log('Aluno criado com sucesso');
            return aluno;
        }
        return null;
    }

    public static async findById({
        matricula,
    }: Pick<Aluno, 'matricula'>): Promise<Aluno | null> {
        const rs = await Database.connection.query<RowDataPacket[]>(
            `SELECT * FROM ALUNOS WHERE MATRICULA = '${matricula}'`,
        );
        const data = rs[0][0];
        if (data) {
            const aluno = new Aluno(data.MATRICULA, data.NOME, data.SEXO);
            console.log('Aluno encontrado com sucesso!');
            return aluno;
        }
        console.log('Aluno não encontrado!');
        return null;
    }

    public static async removeById({
        matricula,
    }: Pick<Aluno, 'matricula'>): Promise<void> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `DELETE FROM ALUNOS WHERE MATRICULA = '${matricula}'`,
        );
        const data = rs[0].affectedRows;
        if (data > 0) {
            console.log('Aluno foi removido com sucesso!');
        } else {
            console.log('Não foi encontrado nenhum aluno com esta matricula!');
        }
    }
}
export default AlunoDAO;
