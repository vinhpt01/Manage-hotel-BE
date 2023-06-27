import { Column, CreateDateColumn, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class BaseSchema {
    @CreateDateColumn({ type: 'datetime' })
    createAt: Date;

    @Column({ type: 'int' })
    createBy: number;

    @DeleteDateColumn({ type: 'datetime' })
    deleteAt: Date;

    @Column({ type: 'int' })
    deleteBy: number;
}
