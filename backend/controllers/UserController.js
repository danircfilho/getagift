const User = require('../models/User')

const bcrypt = require('bcrypt')

//escrever as rotas
module.exports = class UserController {
  static async register(req, res) {
    //trazer os dados do body
    /*
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword
    */
    //Usar destructuring para o exemplo acima
    const { name, email, phone, password, confirmpassword } = req.body

    //validações
    if (!name) {
      res.status(422).json({ message: 'The name is mandatory!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'Email is mandatory!' })
      return
    }
    if (!phone) {
      res.status(422).json({ message: 'The phone is mandatory!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'Password is required!' })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'Confirming the password is required!' })
      return
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'The password and password confirmation must match!' })
      return
    }

    //verificar se o usuario existe
    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(422).json({ message: 'Please use another e-mail!' })
      return
    }

    //criar a senha e criptografar
    const salt = await bcrypt.genSalt(12) //adiciona mais 12 caracteres para dificultar a senha
    const passwordHash = await bcrypt.hash(password, salt) //cria a senha com o salt

    //criar um novo usuário com senha criptografada
    const user = new User({
      name, //name: name, (como recebe o mesmo parametro pode se reduzir)
      email,
      phone,
      password: passwordHash, //cuidado!!! esse campo deve receber a senha criptografada!
    })

    //tratar erros e salvar o novo usuário (user) no banco
    try {
      const newUser = await user.save()
      res.status(201).json({ message: 'User created successfully!', newUser })
    } 
    catch(error) {
      res.status(500).json({ message: error })
    }
  }
}   