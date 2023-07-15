import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffService } from './staff.service';
import { SucessResponse } from 'src/common/helpers/constants';
import { InternalSeverException } from 'src/common/helpers/http-exception.filter';
import { AccountService } from './service/account.service';

@Controller('staff')
export class StaffController {
    constructor(
        private readonly staffService: StaffService,
        private readonly accountService: AccountService
    ) {}

    // @Post()
    // create(@Body() createStaffDto: CreateStaffDto) {
    //     return this.staffService.create(createStaffDto);
    // }

    @Get()
    findAll() {
        return this.staffService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.staffService.findOne(+id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    //     return this.staffService.update(+id, updateStaffDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.staffService.remove(+id);
    }
}
