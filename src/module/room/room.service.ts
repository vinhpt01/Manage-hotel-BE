import { Injectable } from '@nestjs/common';
@Injectable()
export class RoomService {
    // create(createRoomDto: CreateRoomDto) {
    //     return 'This action adds a new room';
    // }

    findAll() {
        return `This action returns all room`;
    }

    findOne(id: number) {
        return `This action returns a #${id} room`;
    }

    // update(id: number, updateRoomDto: UpdateRoomDto) {
    //     return `This action updates a #${id} room`;
    // }

    remove(id: number) {
        return `This action removes a #${id} room`;
    }
}
