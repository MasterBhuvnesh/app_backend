// TRANING THE MODEL
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    date:String
})
const UserModel = mongoose.model("birthday",UserSchema)
module.exports=UserModel