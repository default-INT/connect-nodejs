import { Column, Entity, OneToMany } from 'typeorm';
import { Event } from 'storage/entities/Event';
import { BaseEntity } from './BaseEntity';

@Entity('languages')
export class Language extends BaseEntity {
  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  nativeName: string;

  @OneToMany(() => Event, event => event.owner)
  events: Event[];
}
