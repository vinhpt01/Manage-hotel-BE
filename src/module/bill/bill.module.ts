import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { BillDetail } from './entities/bill-detail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bill, BillDetail])],
    controllers: [BillController],
    providers: [BillService],
})
export class BillModule {}
