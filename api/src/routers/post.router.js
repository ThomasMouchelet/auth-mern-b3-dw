const express = require('express')
const PostController = require('../controllers/post.controller')
const router = express.Router()

router.get("/posts" , PostController.getAll)

module.exports = router