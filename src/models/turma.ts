import Disciplina from './disciplina';
import Professor from './professor';

class Turma {
    constructor(
        public id: number,
        public professor: Professor,
        public disciplina: Disciplina,
    ) {}
}
export default Turma;
