import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Account } from './entities/account.entity';
import { ActivityHistory } from './entities/activity-history.entity';
import { AccountService } from './service/account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Staff, Account, ActivityHistory])],
    controllers: [StaffController],
    providers: [StaffService, AccountService, ActivityHistory],
    exports: [AccountService],
})
export class StaffModule {}
