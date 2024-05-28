const User = require("../models/User")
// http://localhost:5000/api/user_info/info
module.exports.info = async function(req, res) {
    const user = await User.findOne({
        email: req.body.email
    })
    res.status(200).send(user)
}
module.exports.getUserCart = async function(req, res) {
    const user = await User.findOne({email: req.body.email})

    res.status(200).json({
        user: user
    })
}
// http://localhost:5000/api/user_info/delete_from_cart
module.exports.deleteFromUserCart = async function(req, res) {
    const user = await User.findOne({email: req.body.email})
    const cart = user.cart
    cart.splice(cart.indexOf(cart.find(obj => obj._id.toString() === req.body.id)), 1);
    const updated = {
        cart: cart
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
        message: "OK"
    })
}

module.exports.infoById = async function(req, res) {
    const user = await User.findOne({_id: req.body.id})
    res.send(user)
}