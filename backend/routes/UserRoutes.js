const router = require('express').Router()

const UserController = require('../controllers/UserController')

//middlewares
const checkToken = require('../helpers/check-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch( //multer: ao perceber um arquivo de imagem destina ao banco de dados
  '/edit/:id', 
  checkToken, 
  imageUpload.single('image'), //recebe uma unica imagem (single)e destina ao campo do bd (image)
  UserController.editUser
) 

module.exports = router