import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'storage/entities/User';
import { Location } from 'storage/entities/Location';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  eventType: string;

  @Column({ type: 'datetime' })
  finishDate: Date;

  @Column({ type: 'int', nullable: true })
  maxParticipants: number | null;

  @Column({ type: 'varchar', nullable: true })
  lang: string | null;

  // TODO: In here we need relations like: Event -> Chat > User[], and user can get Event by Chat
  // participants: User[];

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(() => User, user => user.myEvents, { onDelete: 'CASCADE' })
  owner: User | null;

  @OneToOne(() => Location, location => location.event, { onDelete: 'CASCADE' })
  location: Location | null;
}
