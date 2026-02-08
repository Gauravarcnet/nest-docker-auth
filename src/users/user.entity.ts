import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // table name
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
