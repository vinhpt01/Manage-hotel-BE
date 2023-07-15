import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SucessResponse } from './common/helpers/constants';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    async ping() {
        return new SucessResponse(await this.appService.ping());
    }
}
