import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Turma from './turma';

@Entity()
class Professor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    sexo: string;

    @OneToMany(() => Turma, turma => turma.professor)
    turmas: Turma[];
}
export default Professor;
