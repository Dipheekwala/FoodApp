const express = require ("express");
const bodyParser = require('body-parser');
const app = express();
const users = require("../models/users");


app.use(body-parser.json());

app.post('/login',(req,res) => {
    //extract the username and password from the request body
    const { username,  password } = req.body;
    //find the user in the list of users by matching the provided username
    const user = users.find (user => user.username === username);
    if (!user){
        return res.status(401).json({
            message:"User does not exist"
        });
    }

        //compare the provided password with the password stored fro the user
        if (password=== users.password) {
            // if the passwords match create an authentication token 
            const token = Buffer.from(`${username} : ${password}`).toString('base64');
            //return a 200 ok rersponse with the auth successful message and the token
            return res.status(200).json({
                message: 'auth successful',
                token:token

            });
            
            
            } else {
                //if the passwords doesnt match ,return a 401 Unauthorized response with an error statement
                return res.status(401).json({
                    message:"Username or password is incorrect"
                });
            
  
            }
        }
    
);

function authentication(req, res, next) {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization.Split(' ');

        const authType = authHeader[0];
        const authValue= authHeader[1];
        
        if (authType === 'Basic'){
            const [ username,password,] = Buffer.from(authValue , 'base64').toString().split(":")
            const user = user.find (user => user. username === username);
            if (!user){
                return res .status(401).json({
                    message :"authentication failed"
                });
            }
            if (password=== user.password){
                req.user = user.username;
                next();
            } else {
                return res.status(401).json({
                    message: 'unauthorized'
                })
            }
        } else {
            return res. status(401).json({
                message:'Auth failed'
            });
        }
    } else {
        return res.status(401).json({
            message: "auth header not [present"
        })
    }
}


module.exports = {
    authentication,
    
}