import Institution from '@modules/institutions/infra/typeorm/entities/Institution';
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
import ClassroomsStudents from './ClassroomsStudents';

@Entity('classrooms')
class Classroom {
  @PrimaryGeneratedColumn('uuid')
  @Exclude({ toPlainOnly: true })
  id: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  name: string;

  // ano
  @Column()
  @Exclude({ toPlainOnly: true })
  year: string;

  // turno
  @Column()
  @Exclude({ toPlainOnly: true })
  shift: string;

  @Column()
  @Exclude()
  institution_id: string;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;

  @OneToMany(
    () => ClassroomsPeople,
    classroomsPeople => classroomsPeople.classroom,
    {
      cascade: ['insert'],
    },
  )
  classroom_people: ClassroomsPeople[];

  @OneToMany(
    () => ClassroomsStudents,
    classroomsStudents => classroomsStudents.classroom,
    {
      cascade: ['insert'],
    },
  )
  classroom_students: ClassroomsStudents[];

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  created_at: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updated_at: Date;
}

export default Classroom;
