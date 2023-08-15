import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    //@Inject('API_KEY') private apiKey: string,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    console.log(this.tasks);
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    return `Hello wordl! ${apiKey} - ${dbName}`;
  }
}
