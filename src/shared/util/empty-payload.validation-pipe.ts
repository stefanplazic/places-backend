/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ValidatePayloadExistsPipe implements PipeTransform {
  transform(payload: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body' && Object.keys(payload).length === 0) {
      throw new BadRequestException('Payload should not be empty');
    }
    return payload;
  }
}
