const router = require('express').Router()

const ThgController = require('../controllers/ThgController')

//middlewares
const checkToken = require('../helpers/check-token')

router.post('/create', checkToken, ThgController.create)

module.exports = router