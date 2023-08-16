import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clienPg: Client,
    //private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    console.log(this.tasks);
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hello wordl! ${apiKey} - ${dbName}`;
  }
  getTasks() {
    return new Promise((resolve, rejects) => {
      this.clienPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          rejects(err);
        }
        resolve(res.rows);
      });
    });
  }
}
