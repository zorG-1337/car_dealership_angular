const express = require("express");
const controller = require("../controllers/testdrive")
const router = express.Router();

router.post('/signUpForTestDrive', controller.signUpForTestDrive)
router.get('/getAllSignUps', controller.getAllSignUps)
router.post('/updateUsersSignUpStatus', controller.updateUsersSignUpStatus)
router.post('/get_all_user_sign_ups', controller.getAllUserSignUps)
module.exports = router