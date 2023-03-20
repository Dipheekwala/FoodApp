const mongoose = require(mongoose)

const orderSchema =new mongoose.Schema({
    items :[{
        foodId: {
            type:mongoose.Schema.Types.ObjectId, ref:'food'
        },
        portion:{
            type:Number
        },
        },
    
],
user:{
    type: mongoose.Schema.Types.ObjectId, ref:'user' ,
 required:true
    },
    status:{
        type:String,
        enum: ['pending', 'delivered'],
        default:'pending'
    },
});
const Order =mongoose.model('order',orderSchema);
module.exports={Order};