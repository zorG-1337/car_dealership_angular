const express = require("express");
const controller = require("../controllers/bought_cars")
const router = express.Router();

router.post('/add_new_bought_car', controller.addNewBoughtCar)
router.post('/get_all_users_purchases', controller.getAllUsersPurchases)
router.get('/get_all_purchases', controller.getAllPurchases)
module.exports = router