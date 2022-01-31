const Thg = require('../models/Thg')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class ThgController {
    //criar os objetos de doação
    static async create(req, res) {

    const { name, age, weight, color } = req.body

    const images = req.file //de onde as imagesn vem (arquivos)

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
    if(!images) {             
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
}