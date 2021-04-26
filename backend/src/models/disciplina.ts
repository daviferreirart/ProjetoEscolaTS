import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Disciplina {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;
}
export default Disciplina;
