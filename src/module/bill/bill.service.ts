import { Injectable } from '@nestjs/common';
@Injectable()
export class BillService {
    // create(createBillDto: CreateBillDto) {
    //     return 'This action adds a new bill';
    // }

    findAll() {
        return `This action returns all bill`;
    }

    findOne(id: number) {
        return `This action returns a #${id} bill`;
    }

    // update(id: number, updateBillDto: UpdateBillDto) {
    //     return `This action updates a #${id} bill`;
    // }

    remove(id: number) {
        return `This action removes a #${id} bill`;
    }
}
