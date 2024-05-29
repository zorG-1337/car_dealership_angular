const Feedback = require("../models/Feedback")

// http://localhost:5000/api/feedbacks/create_feedback
module.exports.createFeedback = async function(req, res) {
    const feedback = new Feedback(
        {
            carId: req.body.carId,
            comment: req.body.comment,
            header: req.body.header,
            userId: req.body.userId,
            rating: req.body.rating
        }
    )

    try {
        await feedback.save()
        res.status(201).json({
            feedback: feedback,
            status: 201
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error,
        })

    }
}