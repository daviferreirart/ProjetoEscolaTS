import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import alunoRouter from './routes/aluno.routes';
import disciplinaRouter from './routes/disciplina.routes';
import professorRouter from './routes/professor.routes';
import turmaRouter from './routes/turma.routes';

import './database/database';
import errorHandler from './error/handler';

const app = express();

app.use(cors());

app.use(express.json());

app.use(alunoRouter, disciplinaRouter, professorRouter, turmaRouter);
app.use(errorHandler);

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Server up!');
});
