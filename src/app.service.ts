import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    //@Inject('API_KEY') private apiKey: string,
    //private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    console.log(this.tasks);
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hello wordl! ${apiKey} - ${dbName}`;
  }
}
