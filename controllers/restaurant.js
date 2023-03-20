const restaurant = require('../models/restaurant')
const food = require('../models/restaurant')
const restaurantModel = require('../models/restaurant')

const getrestaurants = (req,res) => {
     
    restaurantModel.find()
    .then(restaurants=> {
        res.json(restaurants)
    })
    //if an error occurs ,log the error message and send the error back to the client.
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}
const getrestaurantById = (req , res) => {
    const id =req.params.id
    // Use the employeeModel to find a book by its id

restaurantModel.findById(id)
.then(restaurant => {
    res.status(200).json(restaurant)
}).catch(err => {
    console.log(err)
    res.status(404). send(err)
})  
}
const postrestaurant = (req,res) => {
    const restaurant= req.body
    restaurant.lastUpdateAt =new Date ()
    restaurantModel.create(restaurant)
    .then(restaurant=> {
        res.status(201).json(restaurant)
    })  
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

const updaterestaurant = (req,res) => {
    const id = req.params.id
    const restaurant= req.body

    restaurant.lastUpdateAt = new Date()

    restaurantModel.findByIdAndUpdate( id, restaurant, {new: true})
    .then(food => {
        res.status(200).json(restaurant)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}
const deleterestaurantById =(req,res)=> {
    const id = req.params.id
    restaurantModel.findByIdAndRemove(id)
    .then(food => {
        res.status(200).json("restaurant deleted successfully!")
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

module.exports={
    getrestaurants,
    getrestaurantById,
    postrestaurant,
    updaterestaurant,
    deleterestaurantById
}