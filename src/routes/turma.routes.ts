import { Router } from 'express';
import * as Joi from 'joi';
import TurmaDAO from '../dao/turmaDAO';
import AppError from '../error/AppError';

const router = Router();

router.post('/turma', async (request, response) => {
    const { body } = request;
    const schema = Joi.object({
        professorCPF: Joi.string().uuid().required(),
        disciplinaId: Joi.string().uuid().required(),
        semestre: Joi.number().allow(1, 2).valid().required(),
        ano: Joi.number().min(1000).max(9999).required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const turma = await TurmaDAO.create({
        disciplinaId: body.disciplinaId,
        professorCPF: body.professorCPF,
        ano: body.ano,
        semestre: body.semestre,
    });
    return response.status(201).json(turma);
});

router.get('/turma', async (request, response) => {
    const { body } = request;

    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const turma = await TurmaDAO.findById({ id: body.id });
    return response.status(200).json(turma);
});

router.delete('/turma', async (request, response) => {
    const { body } = request;
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const rsDelete = await TurmaDAO.removeById({ id: body.id });
    return response.status(200).json({ resultado: rsDelete });
});

export default router;
