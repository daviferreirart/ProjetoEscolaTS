import Aluno from '../../models/aluno';

type CreateAlunoDTO = Omit<Aluno, 'id'>;
export default CreateAlunoDTO;
