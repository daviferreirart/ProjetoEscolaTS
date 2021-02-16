import Professor from '../../models/professor';

type CreateAlunoDTO = Omit<Professor, 'id'>;
export default CreateAlunoDTO;
