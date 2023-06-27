import { BaseSchema } from 'src/common/entitys/base-schema';
import { Company } from 'src/module/company/entities/company.entity';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeHotel } from '../hotel.constants';
@Entity()
export class Hotel extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @ManyToOne((type) => Company)
    @JoinColumn({ name: 'idCompany', referencedColumnName: 'id' })
    company: Company;

    @Column({ type: 'nvarchar', length: 255, nullable: false })
    nameHotel: string;

    @Column({ type: 'text', nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 30 })
    country: string;

    @Column({ type: 'enum', enum: TypeHotel, nullable: false, default: TypeHotel.HOSTEL })
    typeHotel: TypeHotel;
}
