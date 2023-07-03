import { BaseSchema } from 'src/common/entitys/base-schema';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class ActivityHistory extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @ManyToOne((type) => Account)
    @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
    account: Account;

    @Column({ type: 'nvarchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text' })
    descriptions: string;
}
