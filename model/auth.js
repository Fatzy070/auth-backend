const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Authenticate = new Schema({
    fullname:{
        type:String ,
        required: true 
    },
    email:{
        type:String ,
        required: true ,
        lowercase: true 
    },
    password:{
        type:String ,
        required: true ,
        unique: true 
    },
    role: {
     type: String,
     default: 'user' // this means new users go be normal users
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users' , Authenticate)