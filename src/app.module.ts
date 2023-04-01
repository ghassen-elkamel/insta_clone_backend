import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
 
  MongooseModule.forRoot(process.env.DB_CONNECT, {
  }),
],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
