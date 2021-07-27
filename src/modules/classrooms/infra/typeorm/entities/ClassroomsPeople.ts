import Person from '@modules/people/infra/typeorm/entities/Person';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('classrooms_people')
class ClassroomsPeople {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Person, person => person.classrooms_people)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column('uuid')
  person_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassroomsPeople;
