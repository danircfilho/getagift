const router = require('express').Router

const ThgController = require('../controllers/ThgController')

router.post('/create', ThgController.create)

module.exports = router