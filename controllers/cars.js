const Car = require("../models/Car")
const User = require("../models/User")

// http://localhost:5000/api/cars/create_car
module.exports.create_car = async function(req, res) {
        
    const car = new Car({
        price: req.body.price,
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        yearOfRelease: req.body.yearOfRelease,
        drive: req.body.drive,
        engine: req.body.engine,
        rudder: req.body.rudder,
        image: req.file.filename
    })

    try {
        await car.save()
        res.status(201).json({
            car: car,
            status: 201
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error,
        })

    }
    
}

module.exports.update_car = async function(req, res) {
    res.status(200).json({
        message: "OKKK"
    })
}

module.exports.delete_car = async function(req, res) {
    try {
        await Car.deleteOne({_id: req.body.id})
        res.status(200).json({
            message: "OK"
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error,
            status: 500
        })
    }
        
    
}
// http://localhost:5000/api/cars/find_cars
module.exports.find_cars = async function(req, res) {
    let newObject = {}

    for(key in req.body) {
        if(req.body[key] !== null)
            newObject[key] = req.body[key]
    }
    

    let cars = await Car.find(newObject)

    res.status(200).json({
        request: cars
    })
}
// http://localhost:5000/api/cars/add_car_to_cart
module.exports.add_car_to_cart = async function(req, res) {

    const user = await User.findOne({email: req.body.email})
    const car = await Car.findOne({_id: req.body.id})
    user.cart.push(car)
    const updated = {
        cart: user.cart
    }

    const updatedUser = await User.findOneAndUpdate(
        {
            email: req.body.email
        },
        {
            $set: updated
        },
        {
            new: true
        }
    )
    

    res.status(200).json({
        user: user
    })
}

module.exports.findCarById = async function(req, res) {
    const car = await Car.findOne({_id: req.body.id})
    res.send(car)
}

/*
    let newObject = {}

    for(key in req.body) {
        if(req.body[key] !== null)
            newObject[key] = req.body[key]
    }

    res.status(200).json({
        request: newObject
    })



    // We're gonna filter fields in Object from req which are empty
    
    
    console.log(req.file ? 1 : 0) // Works
    res.status(200).json({
        message: req.file,
        name: req.body.name
    })
    */