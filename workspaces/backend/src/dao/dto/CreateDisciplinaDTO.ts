import Disciplina from '../../models/disciplina';

type CreateDisciplinaDTO = Omit<Disciplina, 'id'>;
export default CreateDisciplinaDTO;
