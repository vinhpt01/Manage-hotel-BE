import { StatusAccount, StatusStaff } from '../staff/staff.constants';

export interface IAuthicationCompany {
    id: number;
    distinguishedName: string;
    nameCompany: string;
    website: string;
    headquarter: string;
}

export interface ILoginBody {
    username: string;
    password: string;
    idHotel: number;
}

export interface IStaffLoginResponse {
    id: number;
    code: string;
    position: string;
    permission: string;
    status: StatusStaff;
}

export interface IAccountLoginResponse {
    id: number;
    roleHotel: string;
    roleSystem: string;
    status: StatusAccount;
}
export interface ILoginResponse {
    accessToken: string;
    staff: IStaffLoginResponse;
    account: IAccountLoginResponse;
}

export interface IPayloadAccessToken {
    username: string;
    password: string;
    hotelId: number;
    timeStamp: Date;
}

export interface IRefreshTokenRequest {
    accessToken: string;
}
