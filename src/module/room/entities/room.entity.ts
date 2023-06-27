import { BaseSchema } from 'src/common/entitys/base-schema';
import { Hotel } from 'src/module/hotel/entities/hotel.entity';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusRoom, TypeRoom } from '../room.constants';
@Entity()
export class Room extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @ManyToOne(() => Hotel)
    @JoinColumn({ name: 'hotelId', referencedColumnName: 'id' })
    hotel: Hotel;

    @Column({ type: 'varchar', length: 10, nullable: false })
    roomNumber: string;

    @Column({ type: 'enum', enum: TypeRoom })
    type: TypeRoom;

    @Column({ type: 'text' })
    descriptionRoom: string;

    @Column({ type: 'enum', enum: StatusRoom, default: StatusRoom.AVAIBLE })
    status: StatusRoom;
}
