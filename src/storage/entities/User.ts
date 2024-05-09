import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, unique: true })
  googleId: string | null;

  @Column({ type: 'varchar', nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar' })
  friendlyName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | null;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
