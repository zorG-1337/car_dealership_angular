const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys")

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if(candidate) {

        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if(passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                user_id: candidate._id
            },keys.jwt, {expiresIn: 60 * 60} )

            res.status(200).json({
                token: token,
                user: candidate
            })

        } else {
            res.status(401).json({
                message: "Passwords are not equal. Try again."
            })
        }

    } else {
        res.status(404).json({
            message: "User with such email doesn't exist"
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
    const candidate2 = await User.findOne({phoneNumber: req.body.phoneNumber})
    if(candidate || candidate2) {
        res.status(409).json({
            message: 'Such email or phone number is already in use',
            status: 409
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            city: req.body.city
        })

        try {
            await user.save()
            res.status(201).json({
                user: user,
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
}
