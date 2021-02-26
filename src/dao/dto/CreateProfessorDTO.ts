import Professor from '../../models/professor';

type CreateProfessorDTO = Omit<Professor, 'id'>;
export default CreateProfessorDTO;
