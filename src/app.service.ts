import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async ping() {
        return 'Pong';
    }
}
