import 'reflect-metadata';
import express from 'express';
import alunoRouter from './routes/aluno.routes';
import disciplinaRouter from './routes/disciplina.routes';

import './database/database';

const app = express();
app.use(express.json());

app.use(alunoRouter, disciplinaRouter);

app.listen(3333, () => {
    console.log('Server up!');
});
