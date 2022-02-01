const router = require('express').Router()

const ThgController = require('../controllers/ThgController')

//middlewares
const checkToken = require('../helpers/check-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', checkToken, imageUpload.array('images'), ThgController.create) //array, varias imagens
router.get('/', ThgController.getAll)//para '/' ThgController) ver todas doações (publica, sem verificação)
router.get('/mythgs', checkToken, ThgController.getAllUserThgs)//minhas coisas para doações
router.get('/myget', checkToken, ThgController.getAllUserGet)//minhas doações adquiridas
router.get('/:id', ThgController.getThgById)//marcar visita
router.delete('/:id', checkToken, ThgController.removeThgById)//evitar que alguém mal intencionado remova algum item de doação
router.patch('/:id', checkToken, imageUpload.array('images'), ThgController.updateThg)//atualizar

module.exports = router