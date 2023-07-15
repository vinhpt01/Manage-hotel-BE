import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { BadRequestException } from 'src/common/helpers/http-exception.filter';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException(error);
        }
        return value;
    }
}
