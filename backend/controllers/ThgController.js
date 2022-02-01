const Thg = require('../models/Thg')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId //checar o id do usuário

module.exports = class ThgController {
    //criar os objetos de doação
    static async create(req, res) {

    const { name, age, weight, color } = req.body

    const images = req.files //de onde as imagensvem (arquivos)

    const available = true

    //imagens para upload (mais de uma imagem)

    //validações
    if(!name) {
      res.status(422).json({ message: 'The name is mandatory!' })
      return
    }
    if(!age) {
      res.status(422).json({ message: 'The age is mandatory!' })
      return
    } 
    if(!weight) {
      res.status(422).json({ message: 'The weight is mandatory!' })
      return
    }
    if(!color) {             
      res.status(422).json({ message: 'The color is mandatory!' })
      return
    }
    //nesta condição, caso o array estiver vazio, a mensagem é impressa
    if(images.length === 0) {             
      res.status(422).json({ message: 'The image is mandatory!' })
      return
    }

    //inserir o dono da doação em um objeto (invocá-lo) por requisição
    const token = getToken(req)
    const user = await getUserByToken(token)

    //criar uma doação (em um novo objeto) com os dados
    const thg = new Thg ({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,  
      },
    })

    images.map((image) => {
      thg.images.push(image.filename)
    })

    try{
      const newThg = await thg.save() //salvar a nova doação
      res.status(201).json({
        message: 'Donation registered successfully!',
        newThg, 
      })
    } catch(error) {
      res.status(500).json({ message: error })
    }
  }
  
  //Visualizar todas as doações
  static async getAll(req, res) {
      
    const thgs = await Thg.find().sort('-createdAt')

    res.status(200).json({
      thgs: thgs,
    })
  }

  static async getAllUserThgs(req, res) {
    //peagr o usuário pelo token
    const token = getToken(req)
    const user = await getUserByToken(token)

    //preencher o array com doações
    const thgs = await Thg.find({ 'user_.id': user._id }).sort('-createdAt')

    res.status(200).json({
      thgs,
    })
  }

  static async getAllUserGet(req, res) {
    //peagr o usuário pelo token
    const token = getToken(req)
    const user = await getUserByToken(token)

    //preencher o array com doações
    const thgs = await Thg.find({ 'acquired_.id': user._id }).sort('-createdAt')

    res.status(200).json({
      thgs,
    })
  }

  static async getThgById(req, res) {
    const id = req.params.id

    //checar se o id é válido
    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id!' })
      return
    }

    //checar se a doação existe
    const thg = await Thg.findOne({ _id: id })

    if(!thg) {
      res.status(404).json({ message: 'Donation not found!' })
    }

    res.status(200).json({
      thg: thg,
    })
  }

  static async removeThgById(req, res) {
    const id = req.params.id

    //checar se o id é válido
    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id!' })
      return
    }

    //checar se a doação existe
    const thg = await Thg.findOne({ _id: id })

    if(!thg) {
      res.status(404).json({ message: 'Donation not found!' })
      return
    }

    res.status(200).json({
      thg: thg,
    })

    //checar se o usuário logado foi quem registrou a doação (verificação pelo token)
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'We were unable to process your request. Try again later.' })
      return
    }

    await Thg.findByIdAndRemove(id)

    res.status(200).json({ message: 'Donation successfully removed!' })
  }

  static async updateThg(req, res) {
    const id = req.params.id

    const { name, age, weight, color, available } = req.body

    const images = req.files 

    const updateData = {} //aqui os dados ficaraão atualizados

    //checar se a doação existe
    const thg = await Thg.findOne({ _id: id })

    if(!thg) {
      res.status(404).json({ message: 'Donation not found!' })
      return
    }

  }

}