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
        nome: 'emily ',
        sexo: 'f',
    }); */
    /* await ProfessorDAO.create({
        nome: 'Marcio',
        sexo: 'm',
    }); */

    // const professor = await ProfessorDAO.findById(1);
    // console.log(professor); */
    /* await DisciplinaDAO.create({
        nome: 'POO',
    }); */
    /* const turma = await TurmaDAO.create({
        disciplinaId: 1,
        professorId: 5,
        semestre: 1,
        ano: 2021,
    });
    console.log(turma); */
    const resultado = await AlunoDAO.findById({
        matricula: 6,
    });
    console.log(resultado);
    /* const remove = await AlunoDAO.removeById({
        matricula: 6,
    }); */
    /* const resultadodis = await DisciplinaDAO.removeById({
        id: 10,
    }); */
    // const resultadoprofid = await ProfessorDAO.findById(5);
    const resultadoprof = await ProfessorDAO.removeById({
        id: 7,
    });
}
main();
