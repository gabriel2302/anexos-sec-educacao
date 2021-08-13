import ClassroomStudents from '@modules/classrooms/infra/typeorm/entities/ClassroomsStudents';
import Institution from '@modules/institutions/infra/typeorm/entities/Institution';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('timestamp with time zone')
  birthdate: Date;

  @Column()
  @Exclude()
  institution_id: string;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;

  @ManyToOne(
    () => ClassroomStudents,
    classroomStudents => classroomStudents.students,
  )
  @JoinColumn({ name: 'classroomStudent_id' })
  classroomStudent: ClassroomStudents;

  @Column()
  @Exclude()
  classroomStudent_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
