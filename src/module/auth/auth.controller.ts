import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    ErrorResponse,
    HttpStatus,
    SucessResponse,
    UnauthorizedResponse,
} from 'src/common/helpers/constants';
import { InternalSeverException } from 'src/common/helpers/http-exception.filter';
import {
    IAuthicationCompany,
    ILoginBody,
    IPayloadAccessToken,
    IRefreshTokenRequest,
} from './auth.interfaces';
import { I18nContext } from 'nestjs-i18n';
import { JoiValidationPipe } from 'src/common/pipe/joi-validation/joi-validation-pipe';
import { loginBodySchema, refreshTokenRequestSchema } from './auth.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { StaffService } from '../staff/staff.service';
import { StatusAccount, StatusStaff } from '../staff/staff.constants';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly staffService: StaffService
    ) {}

    @Get('/refresh-token')
    async refreshToken(
        @Query(new JoiValidationPipe(refreshTokenRequestSchema))
        query: IRefreshTokenRequest
    ) {
        const i18n = I18nContext.current();
        const payload: IPayloadAccessToken = (await this.jwtService.decode(
            query.accessToken
        )) as IPayloadAccessToken;
        if (!payload?.username || !payload.password || !payload.hotelId) {
            const message = i18n?.translate('error.auth.refreshTokenInvalid') || '';
            return new UnauthorizedResponse(message);
        }
        const newToken = await this.jwtService.signAsync({
            username: payload?.username,
            password: payload.password,
            hotelId: payload.hotelId,
            timeStamp: new Date(),
        });
        const message = i18n?.translate('success.auth.refreshToken') || '';
        return new SucessResponse(message, { accessToken: newToken });
    }

    @Get('/:dn')
    async authenticationCompany(@Param('dn') dn: string) {
        try {
            const i18n = I18nContext.current();
            const company = (await this.authService.authenticationCompany(
                dn
            )) as IAuthicationCompany;
            if (!company) {
                const message = i18n?.translate('error.notfound') || '';
                return new ErrorResponse(message, HttpStatus.NOT_FOUND);
            }
            const message = i18n?.translate('success.success') || '';
            return new SucessResponse(message, {
                id: company.id,
                distinguishedName: company.distinguishedName,
                nameCompany: company.nameCompany,
                website: company.website,
                headquarter: company.headquarter,
            });
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }

    @Post('/login')
    async login(@Body(new JoiValidationPipe(loginBodySchema)) body: ILoginBody) {
        try {
            const i18n = I18nContext.current();
            const accounts = await this.authService.getAccount(body);
            if (!accounts) {
                const message = i18n?.translate('error.notfound') || '';
                return new ErrorResponse(message, HttpStatus.NOT_FOUND);
            }
            const isValid = await bcrypt.compare(
                body.password,
                accounts?.accPassword || ''
            );
            if (!isValid) {
                const message = i18n?.translate('error.unauthorized') || '';
                return new UnauthorizedResponse(message);
            }
            const staff = await this.staffService.getStaffByAccountId(accounts.id);

            if (
                !staff ||
                accounts.status === StatusAccount.REJECT ||
                staff.status === StatusStaff.DEACTIVE
            ) {
                const message = i18n?.translate('auth.error.notExsitAccount') || '';
                return new UnauthorizedResponse(message);
            }

            if (accounts.status === StatusAccount.PENDDING) {
                const message = i18n?.translate('auth.error.accountPendding') || '';
                return new UnauthorizedResponse(message);
            }

            const payload: IPayloadAccessToken = {
                username: accounts.username,
                password: accounts.accPassword,
                hotelId: body.idHotel,
                timeStamp: new Date(),
            };
            const accessToken = await this.jwtService.signAsync(payload);
            const message = i18n?.translate('success.success') || '';
            return new SucessResponse(message, {
                accessToken,
                staff: {
                    id: staff.id,
                    code: staff.employeesCode,
                    position: staff.positionStaff,
                    permission: staff.permission,
                    status: staff.status,
                },
                account: {
                    id: accounts.id,
                    roleHotel: accounts.roleHotel,
                    roleSystem: accounts.roleSystem,
                    status: accounts.status,
                },
            });
        } catch (error) {
            throw new InternalSeverException(error);
        }
    }
}
