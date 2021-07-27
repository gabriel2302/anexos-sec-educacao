import Institution from '@modules/institutions/infra/typeorm/entities/Institution';
import Person from '@modules/people/infra/typeorm/entities/Person';

import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import ClassroomsPeople from './ClassroomsPeople';

@Entity('classrooms')
class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // ano
  @Column()
  year: string;

  // turno
  @Column()
  shift: string;

  @Column()
  @Exclude()
  institution_id: string;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;

  @OneToMany(
    () => ClassroomsPeople,
    classroomsPeople => classroomsPeople.person,
    {
      cascade: ['insert'],
    },
  )
  people: Person[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Classroom;
