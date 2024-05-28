const express = require("express");
const controller = require("../controllers/user_info")
const router = express.Router();
router.post('/info', controller.info)
router.post('/get_cart', controller.getUserCart)
router.post('/delete_from_cart', controller.deleteFromUserCart)
router.post('/get_info_by_id', controller.infoById)
module.exports = router