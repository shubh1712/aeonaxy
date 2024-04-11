import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const User = mongoose.model("User",userSchema)

export default User