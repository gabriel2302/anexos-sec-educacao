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

import Institution from '@modules/institutions/infra/typeorm/entities/Institution';
import ClassroomsPeople from '@modules/classrooms/infra/typeorm/entities/ClassroomsPeople';
import { Exclude } from 'class-transformer';

@Entity('persons')
class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // matricula
  @Column()
  enrollment: string;

  // cargo
  @Column()
  office: string;

  // funcao
  @Column()
  occupation: string;

  // situacao funcional
  @Column()
  functional_situation: string;

  @Column()
  institution_id: string;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;

  @OneToMany(
    () => ClassroomsPeople,
    classroomsPeople => classroomsPeople.classroom,
  )
  classrooms_people: ClassroomsPeople[];

  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Person;
