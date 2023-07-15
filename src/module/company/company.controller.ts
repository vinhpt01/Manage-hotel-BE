import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { InternalSeverException } from 'src/common/helpers/http-exception.filter';
import { SucessResponse } from 'src/common/helpers/constants';
import { I18nContext } from 'nestjs-i18n';
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    // @Post()
    // create(@Body() createCompanyDto: CreateCompanyDto) {
    //     return this.companyService.create(createCompanyDto);
    // }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(+id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    //     return this.companyService.update(+id, updateCompanyDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companyService.remove(+id);
    }
}
