export interface CreateUserDto {
    createAt?: Date;
    createBy?: number;
    deleteAt?: Date;
    deleteBy?: number;
    firstName: string;
    lastName: string;
    numberPhone: string;
    citizenIdentification?: string;
    birthDay?: Date;
    taxCode?: string;
    address?: string;
    job?: string;
    email?: string;
    folk?: string;
    religion?: string;
    country?: string;
}

export interface UpdateUserDto {
    id: number;
    firstNam?: string;
    lastName?: string;
    numberPhone?: string;
    citizenIdentification?: string;
    birthDay?: Date;
    taxCode?: string;
    address?: string;
    job?: string;
    email?: string;
    folk?: string;
    religion?: string;
    country?: string;
}
