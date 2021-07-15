import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Institution from '@modules/institutions/infra/typeorm/entities/Institution';
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
  @Exclude()
  institution_id: string;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Person;
