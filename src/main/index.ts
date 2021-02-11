import Database from '../database/database';
import Aluno from '../models/aluno';
import AlunoDAO from '../dao/alunoDAO';

const aluno = new Aluno(5, 'Davi', 'M');
async function main() {
    await Database.connect();
    await AlunoDAO.create({
        nome: 'francisca simone',
        sexo: 'f',
    });
}
main();
