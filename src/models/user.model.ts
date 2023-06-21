import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps :true})
export class User{
    @Prop({
        type:String,
        trim:true
    })
    userName:string
    @Prop({
        type:String,
        trim:true
    })
    email:string
    @Prop(
        {
            type:String,
            trim:true
        }
    )
    profileName
    @Prop({
        type:String
    })
    password:string
    @Prop(
        {
          type:String,
          default: ''
        
        }
      )
      deviceToken:string; 
      @Prop(
        {
          type:Boolean,
          default:false
    
      }
      )
      isDeleted:boolean;
      @Prop(
        {
          type:Boolean,
          default:false
    
      }
      )
      isArchived:boolean;

}
export const UserSchema=SchemaFactory.createForClass(User)