import Disciplina from './disciplina';
import Professor from './professor';

class Turma {
    constructor(
        public id: number,
        public professorId: number,
        public disciplinaId: number,
    ) {}
}
export default Turma;
