import Professor from '../../models/professor';
import Turma from '../../models/turma';

type CreateTurmaDTO = Omit<Turma, 'id'>;
export default CreateTurmaDTO;
