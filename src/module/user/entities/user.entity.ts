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

    @Column('varchar', { length: 30, nullable: true })
    citizenIdentification: string;

    @Column({ nullable: true })
    birthDay: Date;

    @Column('varchar', { length: 20, nullable: true })
    taxCode: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column('nvarchar', { length: 30, nullable: true })
    job: string;

    @Column('varchar', { length: 255, nullable: true })
    email: string;

    @Column('nvarchar', { length: 50, nullable: true })
    folk: string;

    @Column('nvarchar', { length: 50, nullable: true })
    religion: string;

    @Column('varchar', { length: 30, nullable: true })
    country: string;
}
