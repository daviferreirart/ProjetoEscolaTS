import Professor from '../../models/professor';

type CreateProfessorDTO = Omit<Professor, 'id' | 'turmas'>;
export default CreateProfessorDTO;
