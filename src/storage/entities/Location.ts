import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Event } from 'storage/entities/Event';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'locations' })
export class Location extends BaseEntity {
  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  city: string | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  coords: string | null;

  @OneToOne(
    () => Event,
      event => event.location,
    { onDelete: 'CASCADE', cascade: true },
  )
  @JoinColumn()
  event: Event | null;
}
