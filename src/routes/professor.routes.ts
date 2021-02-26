import { Router } from 'express';
import * as Joi from 'joi';
import ProfessorDAO from '../dao/professorDAO';

const router = Router();

router.post('/professor', async (request, response) => {
    const { body } = request;
    const schema = Joi.object({
        nome: Joi.string().max(50).required(),
        sexo: Joi.string().length(1).required(),
    });
    const rs = schema.validate(body);
    if (rs.error) {
        return response.status(400).json({ error: rs.error.message });
    }
    const professor = await ProfessorDAO.create({
        nome: String(body.nome),
        sexo: String(body.sexo),
        turmas: [],
    });
    return response.status(201).json({ professor });
});

router.get('/professor', async (request, response) => {
    const { body } = request;
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });

    const rs = schema.validate(body);
    if (rs.error) {
        return response.status(400).json({ error: rs.error.message });
    }
    const professor = await ProfessorDAO.findById({ id: body.id });
    return response.status(200).json({ professor });
});

export default router;
