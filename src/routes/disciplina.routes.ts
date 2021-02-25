import { Router } from 'express';
import * as Joi from 'joi';
import DisciplinaDAO from '../dao/disciplinaDAO';

const router = Router();

router.post('/disciplina', async (request, response) => {
    const { body } = request;

    const schema = Joi.object({
        nome: Joi.string().max(50).required(),
    });
    const rs = schema.validate(body);
    if (rs.error) {
        return response.status(400).json({ error: rs.error.message });
    }
    const disciplina = await DisciplinaDAO.create({
        nome: String(body.nome),
    });
    return response.status(200).json(disciplina);
});

router.get('/disciplina', async (request, response) => {
    const { body } = request;
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = schema.validate(body);
    if (rs.error) {
        return response.status(400).json({ error: rs.error.message });
    }
    const disciplina = await DisciplinaDAO.findById({ id: body.id });
    return response.status(200).json({ disciplina });
});

router.delete('/disciplina', async (request, response) => {
    const { body } = request;
    const scheme = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = scheme.validate(body);
    if (rs.error) {
        return response.status(400).json({ error: rs.error.message });
    }
    const rsDelete = await DisciplinaDAO.removeById({ id: body.id });
    return response.status(200).json({ resultado: rsDelete });
});
export default router;
