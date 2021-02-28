import { Router } from 'express';
import * as Joi from 'joi';
import AlunoDAO from '../dao/alunoDAO';
import AppError from '../error/AppError';

const router = Router();

router.post('/aluno', async (request, response) => {
    const { body } = request;

    const schema = Joi.object({
        nome: Joi.string().max(50).required(),
        sexo: Joi.string().length(1).required(),
    });

    const rs = schema.validate(body, { abortEarly: false });

    if (rs.error) {
        throw new AppError(rs.error.message);
    }

    const aluno = await AlunoDAO.create({
        nome: String(body.nome),
        sexo: String(body.sexo),
    });
    return response.status(201).json(aluno);
});

router.get('/aluno', async (request, response) => {
    const { body } = request;

    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const aluno = await AlunoDAO.findById({ id: body.id });
    return response.status(200).json(aluno);
});

router.delete('/aluno', async (request, response) => {
    const { body } = request;

    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }

    const rsDelete = await AlunoDAO.removeById({ id: body.id });
    return response.status(200).json({ anything: rsDelete });
});

export default router;
