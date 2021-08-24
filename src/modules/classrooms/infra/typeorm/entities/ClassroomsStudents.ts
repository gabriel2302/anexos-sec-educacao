import {
  Entity,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Student from '@modules/students/infra/typeorm/entities/Student';
import Classroom from './Classroom';

@Entity('classrooms_students')
class ClassroomStudents {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Student, student => student.id, {
    eager: true,
  })
  students: Student[];

  @ManyToOne(() => Classroom)
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @Column('uuid')
  @Exclude({ toPlainOnly: true })
  classroom_id: string;

  @Column('uuid')
  @Exclude({ toPlainOnly: true })
  student_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassroomStudents;
