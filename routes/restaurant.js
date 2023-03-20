const express = require ('express');
const {
    getrestaurants,
    getrestaurantById,
    postrestaurant,
    updaterestaurant,
    deleterestaurantById
}= require ("../controllers/restaurant");

const restaurantrouter = express.Router()

restaurantrouter.get("/", getrestaurants);
restaurantrouter.get("/:id", getrestaurantById);
restaurantrouter.post("/", postrestaurant);
restaurantrouter.patch("/:id", updaterestaurant);
restaurantrouter.delete("/:id",deleterestaurantById)
module.exports = restaurantrouter
