import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { USER_PROVIDER } from 'src/config';
import { User } from 'src/models/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_PROVIDER) private readonly UserModel:Model<User>
    ){}
    async login(body :LoginDto){
        const{userName,password}=body
     const   user=await this.getUserByUserName(userName)
     const verifPassword =await this.decodePassword(user,password)
    
    

        

    }
    async getUserByUserName(userName:String):Promise<User>{
    return await this.UserModel.findOne({'userName':userName})

    }
    async decodePassword(user:User,password:string):Promise<boolean>{
        let match=false

    match=user &&(await bcrypt.compare(password,user.password))
    return match
    }
}
