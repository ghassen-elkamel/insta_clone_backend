import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthProvider } from './auth.provider';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/common/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[ConfigModule.forRoot(),
        DatabaseModule,  JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
          }),],
    providers:[AuthService,...AuthProvider],
    controllers:[AuthController],
    exports:[AuthService,...AuthProvider]
})
export class AuthModule {
}
