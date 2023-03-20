const { users } =require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users')


const signup = async (req ,res) => {
    try {
        const {email ,password,username,phone} = req.body;
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(409).json({message : 'User already exists'});
        }
        const user = new users({email,password,username,phone});
        await user.save();
        const token = jwt.sign({userId: user._id },process.env.JWT_SECRET);
        res.status(201).json({user,token});
    }catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'})
    }
};

const login= async (req,res,next) => {
    passport.authenticate('local', {session: false},(err,user,info)=>{
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        ResizeObserver.JSON({user,token});
    })(req, res, next)
};

const getusers = (req,res) => {
     
    usersModel.find()
    .then(users => {
        res.json(users)
    })
    //if an error occurs ,log the error message and send the error back to the client.
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}
const getusersById = (req , res) => {
    const id =req.params.id
    // Use the bookModel to find a book by its id

usersModel.findById(id)
.then(users => {
    res.status(200).json(users)
}).catch(err => {
    console.log(err)
    res.status(404). send(err)
})  
}

const updateuser = (req,res) => {
    const id = req.params.id
    const user = req.body

    user.lastUpdateAt = new Date()

    usersModel.findByIdAndUpdate( id, users, {new: true})
    .then(user => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}
const deleteuserById =(req,res)=> {
    const id = req.params.id
    usersModel.findByIdAndRemove(id)
    .then(users => {
        res.status(200).json("user deleted successfully!")
    })
    .catch(err => {
        res.status(500).send(err)
    })
}


module.exports={
    getusers,
    getusersById,
    signup,
    login,
    updateuser,
    deleteuserById,
    
}