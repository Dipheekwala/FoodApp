const express =require("express");
//importing data
const fs= require('fs');
const food = require('./database/food.json');
const employees =require('./database/employees.json');
const restaurant = require('./database/restaurant.json');
const users = require('./database/users.json');
const bodyparser= require('body-parser');
const e = require("express");
const { parse } = require("path");
const { json } = require("body-parser");
const app= express()
app.use(bodyparser.json());

const port=2104
app.get("/", authentication,(req,res)=> {
    res.send("this is the home page")

})

app.get("/food",authentication,(req,res)=>{
 res.send(food)
})

app.get("/restaurant",authentication,(req,res)=>{
    res.send(restaurant)

})
app.get("/employees",authentication,(req,res)=>{
    res.send(employees)
})

app.post("/food",(req,res) =>{
    const food = {
    id:req.body.id,
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,
    portion : req.body.portion
    }

    let data = fs.readFileSync('database/food.json');
    let foods = JSON.parse(data);

    foods.push(food);

    fs.writeFileSync('database/food.json', JSON.stringify(foods));
    res.send("food added successfully");

})

app.post("/employees",(req,res) => {
    const employees={
        id:req.body.id,
        name:req.body.name,
        nationality:req.body.nationality,
        state:req.body.state,
        gender:req.body.gender
    }
      
    let data = fs.readFileSync('database/employees.json');
    let employeedata = JSON.parse(data);

    employeedata.push(employees);

    fs.writeFileSync('database/employees.json', JSON.stringify(employeedata));
    res.send("employee data added successfully");
})
 app.post("/restaurant",(req,res) => {
    const restaurant ={
        id:req.body.id,
        name:req.body.name,
        location:req.body.location,
        rating:req.body.rating,
        employees:req.body.employees
    }


    let data = fs.readFileSync('database/restaurant.json');
    let restaurants = JSON.parse(data);


    restaurants.push(restaurant);


    fs.writeFileSync('database/restaurant.json', JSON.stringify(restaurants));
    res.send("restaurant successfully added to the list");

 }) 
app.patch('/food/:id' ,(req,res) => {
    const food=JSON.parse(fs.readFileSync('database/food.json'));

    const foods = food. find(food => food.id == req.params.id);

    food.id=req.body.id;
    food.name=req.body.name;
    food.description=req.body.description;
    food.portion=req.body.portion;
    food.price=req.body.price;

    fs.writeFileSync('database/food.json',JSON.stringify(food));
    res.send('food updated sucessfully');
})
app.patch('/employees/:id' ,( req,res) => {
    const employees = JSON.parse(fs.readFileSync('database/employees.json'));
    const employeedata= employees.find(employees =>employees.id == req.params.id );

    employees.id=req.body.id;
    employees.name=req.body.name;
    employees.nationality= req.body.nationality;
    employees.state=req.body.state;
    employees.gender=req.body.gender;
    employees.dateEmployed=req.body.dateEmployed;

    fs.writeFileSync('database/employees.json',JSON.stringify(employees));
    res.send('employee data updated successfully updated');

})


app.patch('/restaurants/:id' ,( req,res) => {
    const restaurants = JSON.parse(fs.readFileSync('database/employees.json'));
    const restaurant= restaurants.find(restaurants =>restaurants.id == req.params.id );

    restaurants.id=req.body.id;
    restaurants.name=req.body.name;
    restaurants.location=req.body.location;
    restaurants.rating=req.body.rating;
    restaurants.employees=req.body.employees

    fs.writeFileSync('database/restaurants.json',JSON.stringify(restaurants));
    res.send('restaurant data updated successfully updated');
})
//get employee using id
app.get('/employees/:id',(req,res) =>{
    //read the existing file from the file
    let data =fs.readFileSync('database/employees.josn');
    //parse the data as JSON
    let employees= JSON.parse(data);
    //find the employee with the specified id 
    let employee=employees.find(employees => employee.id == req.params.id);
    // send the found employee back as the response
    if (employee) {
        res.send(employee);
    } else {
        res.status(404). send ({error:"employee does not exist !"});
    }
});
//get restaurants using id
app.get('/restaurant/:id',(req,res) =>{
    //read the existing file from the file
    let data =fs.readFileSync('database/restaurant.josn');
    //parse the data as JSON
    let restaurant= JSON.parse(data);
    //find the  restaurant with the specified id 
    let restaurants=restaurant.find(restaurant => restaurant.id == req.params.id);
    // send the found restaurant back as the response
    if (restaurant) {
        res.send(restaurant);
    } else {
        res.status(404). send ({error:"restaurant does not exist !"});
    }
});

//get food using id
app.get('/food/:id',(req,res) =>{
    //read the existing file from the file



    let data =fs.readFileSync('database/food.json');
    //parse the data as JSON


    let food= JSON.parse(data);
    //find the food with the specified id
    
    
    let foods=food.find(food => food.id == req.params.id);
    
    // send the found food back as the response


    if (food) {
        res.send(food);
    } else {
        res.status(404). send ({error:"food does not exist !"});
    }
});

//delete food using id
app.delete('/food/:id', (req,res) => {
    //get the id from the request parameters
    let id = req.params.id;
    //read the JSON file
    let foodData = JSON.parse(fs.readFileSync('database/food.json'));
    //filter out the food with the specified id
    let foods= foodData.filter(food => food.id != id);
    //convert the updated array to a JSON string
    let foodfiltered= JSON.stringify(foods);

    //write to file
    fs.writeFileSync("database/food.json", foodfiltered) 
    res.send ("food has been deleted succesfully!");
});

app.delete('/employees/:id', (req,res) => {
    //get the id from the request parameters
    let id = req.params.id;
    //read the JSON file
    let employeeData = JSON.parse(fs.readFileSync('database/employees.json'));
    //filter out the employees with the specified id
    let employee= employeeData.filter(employees=> employees.id != id);
    //convert the updated array to a JSON string
    let employeesfiltered= JSON.stringify(employee);

    //write to file
    fs.writeFileSync("database/employees.json", employeesfiltered) 
    res.send ("employees data has been deleted succesfully!");
});

app.delete('/restaurants/:id', (req,res) => {
    //get the id from the request parameters
    let id = req.params.id;
    //read the JSON file
    let restaurantData = JSON.parse(fs.readFileSync('database/restaurants.json'));
    //filter out the restaurant with the specified id
    let restaurant= restaurantData.filter(restaurants => restaurants.id != id);
    //convert the updated array to a JSON string
    let restaurantfiltered= JSON.stringify(restaurant);

    //write to file
    fs.writeFileSync("database/reataurants.json", restaurantfiltered) 
    res.send ("restaurant data has been deleted succesfully!");
});


app.post('/register',(req,res) =>{
const user={
    id:req.body.id,
    userName:req.body.UserName,
    firstName:req.body.FirstName,
    lastName:req.body.LastName,
    email:req.body.Email,
    password:req.body.Password

}
let data= fs.readFileSync('database/users.json');
let users= JSON.parse(data)

users.push(user)

fs.writeFileSync('database/users.json', JSON.stringify(user));
res.send("user has been added succesfully ");
});

// secure password hashing library such as bcrypt or scrypt to store passwords
app.post('/login',(req,res)=> {
    //extract the username and password from the request body
    const { userName,  password} = req.body;
    //find the user in the list of users by matching the provided username
    const user = users.find (user => user.userName === userName);
    if (!user){
        return res.status(401).json({
            message:"User does not exist"
        });
    }

        //compare the provided password with the password stored fro the user
        if (password=== user.password) {
            // if the passwords match create an authentication token 
            const token = Buffer.from(`${userName} : ${password}`). toString('base64');
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


//Middleware to authenticate request 
function authentication(req, res, next) {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization.Split(' ');

        const authType = authHeader[0];
        const authValue= authHeader[1];
        
        if (authType === 'Basic'){
            const [ userName,password] = Buffer.from(authValue , 'base64').toString().split(":")
            const user = users.find (u => u. userName === userName);
            if (!user){
                return res .status(401).json({
                    message :"authentication failed"
                });
            }
            if (password=== user.password){
                req.user = user.userName;
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
app.use((req,res)=>{
    res.status(404).json({message : "Page not found"});
});


app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
});


    

