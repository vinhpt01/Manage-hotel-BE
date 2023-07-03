export enum HttpStatus {
    // Successful responses
    OK = 200,
    //Redirection messages

    //Client error responses
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    PRECONDITION_FAILED = 412,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUEST = 429,

    //Server error responses
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAIABLE = 503,
}

export class SucessResponse<T> {
    constructor(message: string, data: T, code: number = HttpStatus.OK) {
        return {
            code,
            message,
            data,
        };
    }
}

export class UnauthorizedResponse<T> {
    constructor(message: string, errors: T, code: number = HttpStatus.UNAUTHORIZED) {
        return {
            code,
            message,
            errors,
        };
    }
}

export class BadRequestResponse<T> {
    constructor(message: string, errors: T, code: number = HttpStatus.BAD_REQUEST) {
        return {
            code,
            message,
            errors,
        };
    }
}

export class ForbidenResponse<T> {
    constructor(message: string, errors: T, code: number = HttpStatus.FORBIDDEN) {
        return {
            code,
            message,
            errors,
        };
    }
}
