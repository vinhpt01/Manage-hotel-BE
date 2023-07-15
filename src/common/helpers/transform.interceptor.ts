import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InternalSeverException } from './http-exception.filter';

export interface Response<T> {
    status: number;
    message: string;
    data?: T;
    error?: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        return next.handle().pipe(
            map((data) => {
                if (!data?.status) {
                    throw new InternalSeverException(new Error('Undefine status'));
                }
                response.status(data.status);
                return data;
            })
        );
    }
}
