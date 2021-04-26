import { Router } from 'express';
import Joi from 'joi';

import AlunoDAO from '../dao/alunoDAO';
import AppError from '../error/AppError';
import Aluno from '../models/aluno';

const router = Router();

type Schema = {
    [k in keyof Omit<Aluno, 'id'>]: Joi.Schema;
};
router.post('/aluno', async (request, response) => {
    const { body } = request;

    const schema: Schema = {
        nome: Joi.string().max(50).required(),
        sexo: Joi.string().length(1).valid('m', 'f', 'M', 'F').required(),
        cpf: Joi.string().length(11).required(),
    };

    const rs = Joi.object(schema).validate(body, { abortEarly: false });

    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const { nome, sexo, cpf } = body;
    const aluno = await AlunoDAO.create({
        nome,
        sexo,
        cpf,
    });
    return response.status(201).json(aluno);
});

router.get('/aluno/:cpf', async (request, response) => {
    const { cpf } = request.params;

    const schema = Joi.object({
        cpf: Joi.string().length(11).required(),
    });
    const rs = schema.validate({ cpf }, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const aluno = await AlunoDAO.findByCPF({ cpf });
    return response.status(200).json(aluno);
});

router.delete('/aluno/:cpf', async (request, response) => {
    const { cpf } = request.params;

    const schema = Joi.object({
        cpf: Joi.string().length(11).required(),
    });
    const rs = schema.validate({ cpf }, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }

    const rsDelete = await AlunoDAO.removeByCPF({ cpf });
    return response.status(204).send();
});

router.get('/listAlunos', async (request, response) => {
    const listaAluno = await AlunoDAO.listAlunos();

    return response.status(200).json(listaAluno);
});

export default router;
