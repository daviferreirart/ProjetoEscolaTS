import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Disciplina from './disciplina';
import Professor from './professor';

@Entity()
class Turma {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Professor, professor => professor.turmas)
    professor: Professor;

    @ManyToOne(() => Disciplina, disciplina => disciplina.id)
    disciplina: Disciplina;

    @Column()
    semestre: number;

    @Column()
    ano: number;
}
export default Turma;
