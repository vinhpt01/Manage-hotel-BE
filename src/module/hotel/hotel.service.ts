import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { DataSource, Repository } from 'typeorm';
import { softDeleteCondition } from 'src/common/entitys/constants';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}
    // create(createHotelDto: CreateHotelDto) {
    //     return 'This action adds a new hotel';
    // }

    async findAllHotelOfCompany(idCompany: number) {
        try {
            const results = await this.dataSource
                .createQueryBuilder(Hotel, 'hotel')
                .where('idCompany=:id', { id: idCompany })
                .getMany();
            return results;
        } catch (error) {
            throw error;
        }
    }

    findAll() {
        return `This action returns all hotel`;
    }

    findOne(id: number) {
        return `This action returns a #${id} hotel`;
    }

    // update(id: number, updateHotelDto: UpdateHotelDto) {
    //     return `This action updates a #${id} hotel`;
    // }

    remove(id: number) {
        return `This action removes a #${id} hotel`;
    }
}
