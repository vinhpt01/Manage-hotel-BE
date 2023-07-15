import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import validateSchema from './common/config/validateSchema';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/entities/user.entity';
import { Staff } from './module/staff/entities/staff.entity';
import { Company } from './module/company/entities/company.entity';
import { Hotel } from './module/hotel/entities/hotel.entity';
import { Account } from './module/staff/entities/account.entity';
import { ActivityHistory } from './module/staff/entities/activity-history.entity';
import { BookingSchedule } from './module/booking/entities/booking-schedule.entity';
import { Room } from './module/room/entities/room.entity';
import { Bill } from './module/bill/entities/bill.entity';
import { BillDetail } from './module/bill/entities/bill-detail.entity';
import { UserModule } from './module/user/user.module';
import { StaffModule } from './module/staff/staff.module';
import { RoomModule } from './module/room/room.module';
import { HotelModule } from './module/hotel/hotel.module';
import { CompanyModule } from './module/company/company.module';
import { BookingModule } from './module/booking/booking.module';
import { BillModule } from './module/bill/bill.module';
import { AuthModule } from './module/auth/auth.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ...validateSchema,
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/../i18n/'),
                watch: true,
            },
            resolvers: [
                AcceptLanguageResolver,
                { use: QueryResolver, options: ['lang'] },
            ],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                User,
                Staff,
                Company,
                Hotel,
                Account,
                ActivityHistory,
                BookingSchedule,
                Room,
                Bill,
                BillDetail,
            ],
            synchronize: true,
            logging: ['error'],
        }),
        UserModule,
        StaffModule,
        RoomModule,
        HotelModule,
        CompanyModule,
        BookingModule,
        BillModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
