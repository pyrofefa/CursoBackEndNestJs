import { Global, Module } from '@nestjs/common';

const API_KEY = '12344556677';
const API_KEY_PROD = 'PROD12344556677';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
