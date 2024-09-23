import { Injectable } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { EventEmitter } from './app.events';

@Injectable()
export class AppService {
  constructor(@InjectEventEmitter() private readonly emitter: EventEmitter) {}

  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit(): any {}
}
