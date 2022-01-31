const router = require('express').Router()

const ThgController = require('../controllers/ThgController')

//middlewares
const checkToken = require('../helpers/check-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', checkToken, imageUpload.array('images'), ThgController.create) //array, varias imagens

module.exports = router