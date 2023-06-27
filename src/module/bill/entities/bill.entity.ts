import { BaseSchema } from 'src/common/entitys/base-schema';
import { Staff } from 'src/module/staff/entities/staff.entity';
import { User } from 'src/module/user/entities/user.entity';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrencyCode } from '../bill.constants';
import { BillDetail } from './bill-detail.entity';

@Entity()
export class Bill extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @ManyToOne(() => Staff)
    @JoinColumn({ name: 'staffId', referencedColumnName: 'id' })
    staff: Staff;

    @Column({ type: 'datetime', nullable: false })
    dateIn: Date;

    @Column({ type: 'datetime', nullable: false })
    dateOut: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'clientId', referencedColumnName: 'id' })
    user: User;

    @Column({ type: 'decimal', precision: 13, scale: 2, default: 0 })
    totalMoney: number;

    @Column({ type: 'varchar', length: 10 })
    currency: CurrencyCode;

    @OneToMany(() => BillDetail, (billDetail) => billDetail.bill)
    billDetails: BillDetail[];
}
