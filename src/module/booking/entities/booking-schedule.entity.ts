import { BaseSchema } from 'src/common/entitys/base-schema';
import { Room } from 'src/module/room/entities/room.entity';
import { User } from 'src/module/user/entities/user.entity';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusBooking } from '../booking.constants';

@Entity()
export class BookingSchedule extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
    room: Room;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

    @Column({ type: 'datetime', nullable: false })
    dateIn: Date;

    @Column({ type: 'datetime', nullable: false })
    dateOut: Date;

    @Column({ type: 'enum', enum: StatusBooking })
    statusBooking: StatusBooking;
}
