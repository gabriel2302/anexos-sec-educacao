import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Person from '@modules/people/infra/typeorm/entities/Person';
import { Exclude } from 'class-transformer';
import Classroom from './Classroom';

@Entity('classrooms_people')
class ClassroomsPeople {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Person, person => person.classrooms_people)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @ManyToOne(() => Classroom, classroom => classroom.classroom_people)
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @Column('uuid')
  person_id: string;

  @Column('uuid')
  @Exclude()
  classroom_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassroomsPeople;
