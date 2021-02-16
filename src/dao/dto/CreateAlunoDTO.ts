import Aluno from '../../models/aluno';

type CreateAlunoDTO = Omit<Aluno, 'matricula'>;
export default CreateAlunoDTO;
