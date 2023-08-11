import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';

@Module({
  controllers: [CustomerController, UsersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
