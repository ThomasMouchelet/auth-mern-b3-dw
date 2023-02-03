const express = require('express')
const AuthController = require('../controllers/auth.controller')
const router = express.Router()

router.post("/signin" , AuthController.signin)
router.post("/signup" , AuthController.signup)

module.exports = router