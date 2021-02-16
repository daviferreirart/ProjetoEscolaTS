import Turma from '../../models/turma';

type CreateTurmaDTO = Omit<Turma, 'id'>;
export default CreateTurmaDTO;
