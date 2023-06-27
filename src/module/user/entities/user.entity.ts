import { BaseSchema } from 'src/common/entitys/base-schema';
import { Check, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@Check(`"numberPhone" not like '%[^0-9]%' or "numberPhone" is null`)
@Check(`"email" is null or "email" like '%@%.%'`)
export class User extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @Column('nvarchar', { length: 45 })
    firstName: string;

    @Column('nvarchar', { length: 45 })
    lastName: string;

    @Column('varchar', { length: 20 })
    numberPhone: string;

    @Column('varchar', { length: 30 })
    citizenIdentification: string;

    @Column()
    birthDay: Date;

    @Column('varchar', { length: 20 })
    taxCode: string;

    @Column({ type: 'text' })
    address: string;

    @Column('nvarchar', { length: 30 })
    job: string;

    @Column('varchar', { length: 255 })
    email: string;

    @Column('nvarchar', { length: 50 })
    folk: string;

    @Column('nvarchar', { length: 50 })
    religion: string;

    @Column('varchar', { length: 30 })
    country: string;
}
