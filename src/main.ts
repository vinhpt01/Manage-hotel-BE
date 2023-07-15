import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/helpers/http-exception.filter';
import { TransformInterceptor } from './common/helpers/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors({
        origin: process.env.WHITE_LIST_ORIGIN?.split(','),
        methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    });
    app.setGlobalPrefix('/api/v1');
    await app.listen(process.env?.PORT || 3000);
}
bootstrap();
