import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { IAuthicationCompany, ILoginBody } from './auth.interfaces';
import { AccountService } from '../staff/service/account.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly companyService: CompanyService,
        private readonly accountService: AccountService
    ) {}

    async authenticationCompany(
        distinguishedName: string
    ): Promise<IAuthicationCompany | null> {
        try {
            return this.companyService.getCompanyByDistinguishedname(distinguishedName);
        } catch (error) {
            throw error;
        }
    }

    async getAccount(data: ILoginBody) {
        try {
            return this.accountService.getAccount(data);
        } catch (error) {
            throw error;
        }
    }
}
