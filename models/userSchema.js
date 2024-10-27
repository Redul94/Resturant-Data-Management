const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: [true,'Username is required'],
    },
    email:{
        type:String,
        require: [true,'Email is required'],
        unique: true
    },
    password:{
        type:String,
        require: [true,'Password is required'],
    },
    Phone:{
        type:String,
        require: [true,'Username is required'],
    },
    address:{
        type:Array,
        require: [true,'Username is required'],
    },
    userType:{
        type: String,
        require: true,
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profileImage:{
        type:String,
        default:'https://www.istockphoto.com/photos/user-profile-image'
    }
});

module.exports = mongoose.model('Users',userSchema);