const BoughtCars = require("../models/BoughtCars")


module.exports.addNewBoughtCar = async function(req, res) {

    const date = new Date()

    const boughtCar = new BoughtCars({
        userId: req.body.userId,
        date: date,
        color: req.body.color,
        brand: req.body.brand,
        yearOfRelease: req.body.yearOfRelease,
        image: req.body.image,
        model: req.body.model,
        price: req.body.price
    })

    try {
        await boughtCar.save()
        res.status(201).json({
            boughtCar: boughtCar,
            status: 201
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error,
        })

    }
}

module.exports.getAllUsersPurchases = async function(req, res) {
    const foundPurchases = await BoughtCars.find({userId: req.body.userId})
    res.send(foundPurchases)
}

module.exports.getAllPurchases = async function(req, res) {
    const purchases = await BoughtCars.find({})

    res.send(purchases)
}