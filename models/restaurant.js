const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
        name :{
             type:String,
             required:true
       }, 
       
       location: {
           type:String,
           required:true
       },
        rating :{
            type:Number,
            required:true
        },
        employees:{
            type:Number,
            required:true
        }
});
module.exports= mongoose.model('restaurant', restaurantSchema);