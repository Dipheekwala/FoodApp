const express = require ('express');
const {
    getusers,
    getusersById,
    login,
    signup,
    updateuser,
    deleteuserById,
    
}= require ("../controllers/users");

const userrouter = express.Router()

userrouter.get("/", getusers);
userrouter.get("/:id", getusersById);
userrouter.post("/signup", signup);
userrouter.post("/login", login);
userrouter.patch("/:id", updateuser);
userrouter.delete("/:id",deleteuserById)

module.exports = userrouter
