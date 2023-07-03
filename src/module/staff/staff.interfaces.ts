import { Hotel } from '../hotel/entities/hotel.entity';
import { User } from '../user/entities/user.entity';
import { StatusStaff } from './staff.constants';

export interface createStaffDto {
    id?: number;
    hotel: Hotel;
    employeesCode: string;
    user: User;
    positionStaff: string;
    status: StatusStaff;
}

export interface updateStaffDto {
    hotel: Hotel;
    employeesCode: string;
    user: User;
    positionStaff: string;
    status: StatusStaff;
}
