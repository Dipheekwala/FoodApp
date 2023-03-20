const food = require('../models/food')
const foodModel = require('../models/food')

const getfoods = (req,res) => {
     
    foodModel.find()
    .then(food => {
        res.json(food)
    })
    //if an error occurs ,log the error message and send the error back to the client.
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}
const getfoodById = (req , res) => {
    const id =req.params.id
    // Use the employeeModel to find a book by its id

foodModel.findById(id)
.then(food => {
    res.status(200).json(food)
}).catch(err => {
    console.log(err)
    res.status(404). send(err)
})  
}
const postfoods = (req,res) => {
    const food = req.body
    food.lastUpdateAt =new Date ()
    foodModel.create(food)
    .then(food => {
        res.status(201).json(food)
    })  
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

const updatefood = (req,res) => {
    const id = req.params.id
    const food = req.body

    food.lastUpdateAt = new Date()

    foodModel.findByIdAndUpdate( id, food, {new: true})
    .then(food => {
        res.status(200).json(food)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}
const deletefoodById =(req,res)=> {
    const id = req.params.id
    foodModel.findByIdAndRemove(id)
    .then(food => {
        res.status(200).json("food deleted successfully!")
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

module.exports={
    getfoods,
    getfoodById,
    postfoods,
    updatefood,
    deletefoodById
}