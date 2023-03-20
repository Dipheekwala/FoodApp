const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
        name :{
             type:String,
             required:true
       }, 
       
       Description: {
           type:String,
           required:true
       },
        portion :{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        imageUrl:{
            type:String,
            required:true
        }
});
const food = mongoose.model('food',foodSchema)
module.exports= mongoose.model('food', foodSchema);