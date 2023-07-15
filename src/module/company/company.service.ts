import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { softDeleteCondition } from 'src/common/entitys/constants';
import { IAuthicationCompany } from '../auth/auth.interfaces';
import { Hotel } from '../hotel/entities/hotel.entity';
@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}
    // create(createCompanyDto: CreateCompanyDto) {
    //     return 'This action adds a new company';
    // }

    getCompanyByDistinguishedname(dn: string) {
        return this.companyRepository.findOneBy({
            distinguishedName: dn,
            ...softDeleteCondition,
        });
    }

    findAll() {
        return `This action returns all company`;
    }

    findOne(id: number) {
        return `This action returns a #${id} company`;
    }

    // update(id: number, updateCompanyDto: UpdateCompanyDto) {
    //     return `This action updates a #${id} company`;
    // }

    remove(id: number) {
        return `This action removes a #${id} company`;
    }
}
