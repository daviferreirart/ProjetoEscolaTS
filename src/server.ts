import 'reflect-metadata';
import express from 'express';
import alunoRouter from './routes/aluno.routes';

import './database/database';

const app = express();
app.use(express.json());

app.use(alunoRouter);

app.listen(3333, () => {
    console.log('Server up!');
});
