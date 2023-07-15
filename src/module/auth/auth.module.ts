import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountService } from '../staff/service/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../staff/entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { Staff } from '../staff/entities/staff.entity';
import { StaffService } from '../staff/staff.service';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, Account, Staff]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1800s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AccountService, StaffService, CompanyService],
})
export class AuthModule {}
