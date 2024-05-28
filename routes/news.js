const express = require("express");
const controller = require("../controllers/news")
const router = express.Router();
router.post('/create_news', controller.createNews)
router.get('/get_news', controller.getNews)
router.delete('/delete_news', controller.deleteNews)
router.put('/update_news', controller.updateNews)
module.exports = router