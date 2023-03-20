const express = require ('express');
const {
    getfoods,
    getfoodById,
    postfoods,
    updatefood,
    deletefoodById
}= require ("../controllers/food");

const foodrouter = express.Router()

foodrouter.get("/", getfoods);
foodrouter.get("/:id", getfoodById);
foodrouter.post("/", postfoods);
foodrouter.patch("/:id", updatefood);
foodrouter.delete("/:id",deletefoodById)
module.exports = foodrouter
