import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.interfaces';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { softDeleteCondition } from 'src/common/entitys/constants';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}
    async create(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.insert(createUserDto);
            return await this.usersRepository.findOneBy(createUserDto);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id: id, ...softDeleteCondition });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const queryRuner = this.dataSource.createQueryRunner();
        await queryRuner.connect();
        await queryRuner.startTransaction();
        try {
            await queryRuner.manager.update(User, id, updateUserDto);
            await queryRuner.commitTransaction();
        } catch (error) {
            await queryRuner.rollbackTransaction();
            throw error;
        } finally {
            await queryRuner.release();
        }
    }

    async removeById(id: number) {
        try {
            await this.dataSource.transaction(async (entityUser) => {
                entityUser.softDelete(User, id);
            });
        } catch (error) {
            throw error;
        }
    }
}
