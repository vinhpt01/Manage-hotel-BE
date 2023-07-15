import { Hotel } from 'src/module/hotel/entities/hotel.entity';
import { User } from 'src/module/user/entities/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusStaff } from '../staff.constants';
import { BaseSchema } from 'src/common/entitys/base-schema';
@Entity()
export class Staff extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @ManyToOne(() => Hotel)
    @JoinColumn({ name: 'hotelId', referencedColumnName: 'id' })
    hotel: Hotel;

    @Column({ type: 'varchar', length: 20 })
    employeesCode: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

    @Column({ type: 'nvarchar', length: 50 })
    positionStaff: string;

    @Column({ type: 'text' })
    permission: string;

    @Column({ type: 'enum', enum: StatusStaff })
    status: StatusStaff;
}
