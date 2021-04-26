import { Router } from 'express';
import * as Joi from 'joi';
import ProfessorDAO from '../dao/professorDAO';
import AppError from '../error/AppError';
import Professor from '../models/professor';

const router = Router();
type Schema = {
    [k in keyof Omit<Professor, 'id' | 'turmas'>]: Joi.Schema;
};

router.post('/professor', async (request, response) => {
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
    const professor = await ProfessorDAO.create({
        nome,
        sexo,
        cpf,
    });
    return response.status(201).json({ professor });
});

router.get('/professor/:cpf', async (request, response) => {
    const { cpf } = request.params;

    const schema = Joi.object({
        cpf: Joi.string().length(11).required(),
    });
    const rs = schema.validate({ cpf }, { abortEarly: false });

    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const professor = await ProfessorDAO.findByCPF({ cpf });

    return response.status(200).json(professor);
});

router.delete('/professor/:cpf', async (request, response) => {
    const { cpf } = request.params;

    const schema = Joi.object({
        cpf: Joi.string().length(11).required(),
    });
    const rs = schema.validate({ cpf }, { abortEarly: false });

    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const rsDelete = await ProfessorDAO.removeByCPF({ cpf });
    return response.status(204).send();
});

router.get('/listProfessores', async (request, response) => {
    const professor = await ProfessorDAO.listProfessores();
    return response.status(200).json(professor);
});

export default router;
