import mongoose, { Schema } from "mongoose"

const userShema =  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlenght:5
    },
    blogs:[{type:mongoose.Types.ObjectId, ref:"Blog", required:true}]
},{timeStamp:true})

const  User = mongoose.model('User',userShema)
export default User