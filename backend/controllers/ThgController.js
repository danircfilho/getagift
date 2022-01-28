const Thg = require('../models/Thg')

module.exports = class ThgController {
  //criar os objetos de doação
  static async create(req, res) {
    res.json({ message: 'All right!' })  

    const { name, age, weight, color } = req.body

    const available = true

    //imagens para upload

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

  }
}