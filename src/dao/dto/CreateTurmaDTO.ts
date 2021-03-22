import Turma from '../../models/turma';

interface CreateTurmaDTO
    extends Omit<Turma, 'id' | 'professor' | 'disciplina'> {
    professorCPF: string;
    disciplinaId: string;
}

export default CreateTurmaDTO;
