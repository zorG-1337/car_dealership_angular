const express = require("express");
const controller = require("../controllers/cars")
const router = express.Router();
const upload = require("../middleware/upload")
router.post('/create_car', upload.single('image'), controller.create_car)
router.put('/update_car', controller.update_car)
router.post('/delete_car', controller.delete_car)
router.post('/find_cars', controller.find_cars)
router.post('/add_car_to_cart', controller.add_car_to_cart)
router.post('/find_car_by_id', controller.findCarById)
module.exports = router