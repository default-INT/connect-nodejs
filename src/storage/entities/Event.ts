import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'storage/entities/User';
import { EventType } from 'shared/dto/EventType';
import { Language } from 'storage/entities/Language';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.Other,
  })
  eventType: EventType;

  @Column({ type: 'datetime' })
  eventDate: Date;

  @Column({ type: 'int', nullable: true })
  maxParticipants: number | null;

  @Column({ nullable: true })
  langId: number;

  @ManyToOne(() => Language, lang => lang.events)
  lang: Language | null;

  // TODO: In here we need relations like: Event -> Chat > User[], and user can get Event by Chat
  // participants: User[];

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  coords: string;

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(() => User, user => user.myEvents, { onDelete: 'CASCADE' })
  owner: User | null;
}
