import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {ApiBody, ApiTags}from '@nestjs/swagger'
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthService } from './auth.service';
import { access } from 'fs';
import { openApiResponse } from 'src/common/decorator/openApi.decorator';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService,) {}

    @Post('login')
    @ApiBody({type:LoginDto})
    @openApiResponse(
        { status: HttpStatus.OK, description: 'accessToken & refreshToken has been returned!' },
        { status: HttpStatus.UNAUTHORIZED, description: 'unothorized!' },
        { status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'something went wrong!' }
      )
    async login(@Body() loginDto: LoginDto,@Res() res) {
        const{userName,password}=loginDto
        const user=await  this.authService.getUserByUserName(userName)
        if(!user){
            return res.status(HttpStatus.UNAUTHORIZED).send({
            statusCode:HttpStatus.UNAUTHORIZED,
            message:"the user name is incorrect"
            })
        }
        const verifPassword =await this.authService.decodePassword(user,password)
        if (!verifPassword) {
            return res.status(HttpStatus.UNAUTHORIZED).send({
              statusCode: HttpStatus.UNAUTHORIZED,
              message: "password incorrect"
            })
    }
    const{accessToken ,refreshToken}=await this.authService.generateToken(user);
    return res.status(HttpStatus.OK).send({
        statusCode:HttpStatus.OK,
        accessToken:accessToken,
        refreshToken:refreshToken,
        id:user._id
    })
    
 

}

}