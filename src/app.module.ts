import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import validateSchema from './common/config/validateSchema';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ...validateSchema,
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/../i18n/'),
                watch: true,
            },
            resolvers: [
                AcceptLanguageResolver,
                { use: QueryResolver, options: ['lang'] },
            ],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [],
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
