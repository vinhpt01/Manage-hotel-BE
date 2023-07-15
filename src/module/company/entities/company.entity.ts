import { BaseSchema } from 'src/common/entitys/base-schema';
import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Company extends BaseSchema {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    @Index({ unique: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @PrimaryColumn()
    @Index({ fulltext: true })
    distinguishedName: string;

    @Column({ type: 'nvarchar', length: 255, nullable: false })
    nameCompany: string;

    @Column({ type: 'varchar', length: 2083 })
    website: string;

    @Column({ type: 'varchar', length: 20 })
    taxCode: string;

    @Column({ type: 'text' })
    headquarter: string;
}
