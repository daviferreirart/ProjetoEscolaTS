import Database from '../database/database';
import CreateProfessorDTO from './dto/CreateProfessorDTO';

abstract class ProfessorDAO {
    public static async create({ nome, sexo }: CreateProfessorDTO) {
        const rs = await Database.connection.query(
            `INSERT INTO PROFESSOR(NOME,SEXO) VALUES ('${nome
                .trim()
                .toUpperCase()}','${sexo.trim().toUpperCase()}')`,
        );
        console.log(rs);
    }
}
export default ProfessorDAO;
