import Database from '../database/database';
import Aluno from '../models/aluno';
import AlunoDAO from '../dao/alunoDAO';
import ProfessorDAO from '../dao/professorDAO';

const aluno = new Aluno(5, 'Davi', 'M');
async function main() {
    await Database.connect();
    await AlunoDAO.create({
        nome: 'francisca simone',
        sexo: 'f',
    });
    /* await ProfessorDAO.create({
        nome: 'juliano',
        sexo: 'm',
    }); */

    // await ProfessorDAO.findById(18);//
}
main();
