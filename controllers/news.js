const News = require("../models/News")

// http://localhost:5000/api/news/create_news
module.exports.createNews = async function(req, res) {
    const news = new News({
        header: req.body.header,
        body: req.body.body,
        authorName: req.body.authorName,
        authorSurname: req.body.authorSurname,
        date: new Date()
    })

    try {
        await news.save()
        res.status(201).json({
            news: news,
            status: 201
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error,
        })

    }
}

module.exports.getNews = async function(req, res) {
    const news = await News.find({})

    res.send(news)
}

// http://localhost:5000/api/news/delete_news

module.exports.deleteNews = async function(req, res) {
    console.log(req.query.id) // here we can get http params
    try {
        await News.deleteOne({_id: req.query.id})
        res.status(200).json({
            message: "OK"
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error,
            status: 500
        })
    }
}

// http://localhost:5000/api/news/update_news

module.exports.updateNews = async function(req, res) {
    const updated = {
        header: req.body.header,
        body: req.body.body
    }

    const news = await News.findOneAndUpdate(
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

    res.send(news)
}