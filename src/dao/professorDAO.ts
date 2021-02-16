import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Database from '../database/database';
import Professor from '../models/professor';
import CreateProfessorDTO from './dto/CreateProfessorDTO';

abstract class ProfessorDAO {
    public static async create({
        nome,
        sexo,
    }: CreateProfessorDTO): Promise<Professor> {
        const rs = await Database.connection.query<ResultSetHeader>(
            `INSERT INTO PROFESSOR(NOME,SEXO) VALUES ('${nome
                .trim()
                .toUpperCase()}','${sexo.trim().toUpperCase()}')`,
        );
        const professor = new Professor(rs[0].insertId, nome, sexo);
        return professor;
    }

    public static async findById(id: number): Promise<Professor> {
        const rs = await Database.connection.query<RowDataPacket[]>(
            `SELECT * FROM PROFESSOR WHERE ID = ${id}`,
        );
        const data = rs[0][0];
        const professor = new Professor(data.ID, data.NOME, data.SEXO);
        return professor;
    }
}
export default ProfessorDAO;
