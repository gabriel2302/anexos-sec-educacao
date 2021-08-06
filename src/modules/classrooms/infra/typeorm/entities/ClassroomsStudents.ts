import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
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

  @OneToMany(() => Student, students => students.id, {
    eager: true,
  })
  students: Student[];

  @ManyToOne(() => Classroom, classroom => classroom.classroom_students, {
    eager: true,
  })
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @Column('uuid')
  @Exclude()
  student_id: string;

  @Column('uuid')
  @Exclude({ toPlainOnly: true })
  classroom_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassroomStudents;
