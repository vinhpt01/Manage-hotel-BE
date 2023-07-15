import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ILoginBody } from 'src/module/auth/auth.interfaces';
import { Staff } from '../entities/staff.entity';
import { Hotel } from 'src/module/hotel/entities/hotel.entity';
import { softDeleteConditionToString } from 'src/common/entitys/constants';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}
    // create(createStaffDto: CreateStaffDto) {
    //     return 'This action adds a new staff';
    // }

    async getAccount(data: ILoginBody) {
        try {
            const results = this.dataSource
                .createQueryBuilder(Account, 'account')
                .leftJoinAndSelect(Staff, 'staff', 'account.staffId=staff.id')
                .leftJoinAndSelect(Hotel, 'hotel', 'staff.hotelId=hotel.id')
                .where(
                    `account.username = :username  AND hotel.id = :hotelId AND ${softDeleteConditionToString(
                        'account'
                    )}`,
                    {
                        username: data.username,
                        hotelId: data.idHotel,
                    }
                )
                .getOne();
            return results;
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
