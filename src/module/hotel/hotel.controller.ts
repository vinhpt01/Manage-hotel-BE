import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { SucessResponse } from 'src/common/helpers/constants';
import { InternalSeverException } from 'src/common/helpers/http-exception.filter';
import { I18nContext } from 'nestjs-i18n';
@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService) {}

    // @Post()
    // create(@Body() createHotelDto: CreateHotelDto) {
    //     return this.hotelService.create(createHotelDto);
    // }

    @Get('/all-hotel-company')
    async findAllHotelOfCompany(@Query('id', ParseIntPipe) id: number) {
        try {
            const i18n = I18nContext.current();
            const hotels = await this.hotelService.findAllHotelOfCompany(id);
            const message = (await i18n?.translate('success.success')) || '';
            return new SucessResponse(message, hotels);
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }

    @Get()
    findAll() {
        return this.hotelService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.hotelService.findOne(+id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    //     return this.hotelService.update(+id, updateHotelDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.hotelService.remove(+id);
    }
}
