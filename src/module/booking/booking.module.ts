import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSchedule } from './entities/booking-schedule.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookingSchedule])],
    controllers: [BookingController],
    providers: [BookingService],
})
export class BookingModule {}
