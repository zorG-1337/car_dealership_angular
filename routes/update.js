const express = require("express");
const controller = require("../controllers/update")
const upload = require("../middleware/upload")
const router = express.Router();
router.put('/update_user_info', controller.update_info)
router.put('/update_user_image', upload.single('image'), controller.update_image)
router.post('/update_balance', controller.updateBalance)
router.post('/update_password', controller.update_password)
module.exports = router