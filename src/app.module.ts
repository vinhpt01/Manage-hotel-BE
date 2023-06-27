import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import validateSchema from './common/config/validateSchema';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './module/user/user.controller';
import { UserService } from './module/user/user.service';
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
        }),
    ],
    controllers: [AppController, UserController],
    providers: [AppService, UserService],
})
export class AppModule {}
