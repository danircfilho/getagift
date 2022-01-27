const router = require('express').Router()

const UserController = require('../controllers/UserController')

//middlewares
const checkToken = require('../helpers/check-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', checkToken, UserController.editUser) //proteção (middleware entre rota e método)

module.exports = router