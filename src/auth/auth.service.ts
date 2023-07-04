import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { REFRESH_TOKEN_TIMEOUT, USER_PROVIDER } from 'src/config';
import { User } from 'src/models/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './dto/jwtPayload.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_PROVIDER) private readonly UserModel:Model<User>,
        private readonly jwtService: JwtService,
    ){}
  
        
  
    
    async getUserByUserName(userName:String):Promise<User>{
    return await this.UserModel.findOne({'userName':userName})
    }
    async decodePassword(user:User,password:string):Promise<boolean>{
        let match=false
    match=user &&(await bcrypt.compare(password,user.password))
    return match
    }
    async generateToken(user :User){
        const payload:JwtPayload={
            mail:user.email,
            userName:user.userName
        }
        const accessToken :string =this.jwtService.sign(payload,{expiresIn:REFRESH_TOKEN_TIMEOUT})
        const refreshToken :string=this.jwtService.sign({
        ...payload,refresh:true
        },{expiresIn:REFRESH_TOKEN_TIMEOUT})
        return { accessToken, refreshToken };

    }
}
