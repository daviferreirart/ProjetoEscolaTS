import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Aluno {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    sexo: string;
}

export default Aluno;
