import { BaseSchema } from 'src/common/entitys/base-schema';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from './bill.entity';
import { CurrencyCode } from '../bill.constants';

@Entity()
export class BillDetail extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @ManyToOne(() => Bill)
    @JoinColumn({ name: 'billId', referencedColumnName: 'id' })
    bill: Bill;

    @Column({ type: 'nvarchar', length: 50, nullable: false })
    nameItem: string;

    @Column({ type: 'nvarchar', length: 50 })
    service: string;

    @Column({ type: 'int', default: 0 })
    quantity: number;

    @Column({ type: 'decimal', precision: 13, scale: 2, default: 0 })
    cost: number;

    @Column({ type: 'nvarchar', length: 10 })
    unit: string;

    @Column({ type: 'varchar', length: 10 })
    currency: CurrencyCode;
}
