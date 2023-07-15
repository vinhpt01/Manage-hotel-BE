import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { createStaffDto } from './staff.interfaces';
import { Account } from './entities/account.entity';
import { softDeleteConditionToString } from 'src/common/entitys/constants';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}
    create(createStaffDto: createStaffDto) {
        return 'This action adds a new staff';
    }

    async getStaffByAccountId(accountId: number) {
        try {
            const resutl = this.dataSource
                .createQueryBuilder(Staff, 'staff')
                .innerJoinAndSelect(Account, 'account', 'account.staffId=staff.id')
                .where(`account.id=:id AND ${softDeleteConditionToString('staff')}`, {
                    id: accountId,
                })
                .getOne();
            return resutl;
        } catch (error) {
            throw error;
        }
    }

    findAll() {
        return `This action returns all staff`;
    }

    findOne(id: number) {
        return `This action returns a #${id} staff`;
    }

    // update(id: number, updateStaffDto: UpdateStaffDto) {
    //     return `This action updates a #${id} staff`;
    // }

    remove(id: number) {
        return `This action removes a #${id} staff`;
    }
}
