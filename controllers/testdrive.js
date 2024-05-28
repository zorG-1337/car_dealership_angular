const TestDrive = require("../models/TestDrive")

module.exports.signUpForTestDrive = async function(req, res) {
    const newUserTestDrive = new TestDrive({
        carId: req.body.carId,
        userId: req.body.userId,
        date: req.body.date
    })

    try {
        await newUserTestDrive.save()
        res.status(201).json({
            newUserTestDrive: newUserTestDrive,
            status: 201
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error,
            status: 500
        })

    }
}

module.exports.getAllSignUps = async function(req, res) {
    const signUps = await TestDrive.find()

    res.send(signUps)
}
module.exports.updateUsersSignUpStatus = async function(req, res) {
    const updated = {
        status: req.body.status,
    }

    const user = await TestDrive.findOneAndUpdate(
        {
            _id: req.body.id
        },
        {
            $set: updated
        },
        {
            new: true
        }
    )

    res.send(user)
}

module.exports.getAllUserSignUps = async function(req, res) {
    const userTestDrives = await TestDrive.find({userId: req.body.userId})

    res.send(userTestDrives)
}