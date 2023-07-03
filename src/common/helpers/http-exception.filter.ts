import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpStatus } from './constants';

export class BaseException extends HttpException {
    private readonly errors;
    constructor(status: number, message: string, errors: any) {
        super('', status);
        this.message = message;
        this.errors = errors;
    }

    getErrors() {
        return this.errors;
    }
}

export class InternalSeverException extends BaseException {
    constructor(errors: any) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', errors);
    }
}

export class BadRequestException extends BaseException {
    constructor(errors: any) {
        super(HttpStatus.BAD_REQUEST, 'Bad Request Exception', errors);
    }
}

@Catch(BaseException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: BaseException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        response.status(status).json({
            code: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
            errors: exception?.getErrors(),
        });
    }
}
