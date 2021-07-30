import ClassroomsStudents from '@modules/classrooms/infra/typeorm/entities/ClassroomsStudents';
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
  OneToMany,
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

  @OneToMany(
    () => ClassroomsStudents,
    classroomsStudents => classroomsStudents.classroom,
  )
  classrooms_students: ClassroomsStudents[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
