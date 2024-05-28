const User = require("../models/User")
const bcrypt = require("bcrypt")
const ImgurClient = require("imgur")
module.exports.update_info = async function(req, res) {
    const updated = {
        name: req.body.name,
        surname: req.body.surname,
    /*    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), */
        city: req.body.city
    }
    const user = await User.findOneAndUpdate(
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
        message: "OK",
        user: user
    })
}

module.exports.update_image = async function(req, res) {

    const updated = {
        image: req.file.filename
    }

    const user = await User.findOneAndUpdate(
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

module.exports.updateBalance = async function(req, res) {
    const updated = {
        balance: req.body.balance
    }

    const user = await User.findOneAndUpdate(
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

    res.send(user)
}

module.exports.update_password = async function(req, res) {
    const user = await User.findOne({email: req.body.email})
    const passwordResult = bcrypt.compareSync(req.body.oldPassword, user.password)

    if(passwordResult) {

        if(req.body.newPassword === req.body.newPasswordRepeat) {
            const updated = {
                password: bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10))
            }

            const newUser = await User.findOneAndUpdate(
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

            res.send(newUser)
        } else {
            res.status(409).json({
                message: 'New passwords are not equal'
            })
        }

    } else {
        res.status(409).json({
            message: 'Old password in not equals to entered password'
        })
    }
}