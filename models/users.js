const mongoose = require ('mongoose');


const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;


const userSchema= new Schema({
    username:{
         type:String,
         required:true
         },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId, ref:'orders'
    }

})

userSchema.pre('save', function(next) {
    if(this.password) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})
// export the model
const users = mongoose.model('users', userSchema);

module.exports = { users }

