import Database from '../database/database';
import Aluno from '../models/aluno';
import AlunoDAO from '../dao/alunoDAO';
import ProfessorDAO from '../dao/professorDAO';
import Turma from '../models/turma';
import TurmaDAO from '../dao/turmaDAO';
import Disciplina from '../models/disciplina';
import DisciplinaDAO from '../dao/disciplinaDAO';

const aluno = new Aluno(5, 'Davi', 'M');
async function main() {
    await Database.connect();
    /* await AlunoDAO.create({
        nome: 'francisca simone',
        sexo: 'f',
    });
    await ProfessorDAO.create({
        nome: 'juliano',
        sexo: 'm',
    }); */

    // const professor = await ProfessorDAO.findById(1);
    // console.log(professor);
    /* await DisciplinaDAO.create({
        nome: 'piru',
    }); */
    const disciplina = await DisciplinaDAO.findById(2);
    console.log(disciplina);
    const turma = await TurmaDAO.create({
        professorID: ProfessorDAO.findById(2),
        disciplinaID: DisciplinaDAO.findById(1),
    });
    console.log(turma);
}
main();
