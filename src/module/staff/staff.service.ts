import { Injectable } from '@nestjs/common';

@Injectable()
export class StaffService {
    // create(createStaffDto: CreateStaffDto) {
    //     return 'This action adds a new staff';
    // }

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
