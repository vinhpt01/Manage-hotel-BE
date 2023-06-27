import { BaseSchema } from 'src/common/entitys/base-schema';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from './staff.entity';
import { StatusAccount } from '../staff.constants';

@Entity()
export class Account extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @OneToOne(() => Staff)
    @JoinColumn({ name: 'staffId', referencedColumnName: 'id' })
    staff: Staff;

    @Column({ type: 'nvarchar', length: 50, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 60 })
    accPassword: string;

    @Column({ type: 'boolean', default: true })
    needChangePassword: boolean;

    @Column({ type: 'text' })
    permission: string;

    @Column({ type: 'enum', enum: StatusAccount })
    status: StatusAccount;
}
