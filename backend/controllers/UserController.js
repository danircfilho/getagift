const User = require('../models/User') //models

const bcrypt = require('bcrypt') //módulo de criptografia

const jwt = require('jsonwebtoken') //importar jwt

//helpers
const createUserToken = require('../helpers/create-user-token') //criar token
const getToken = require('../helpers/get-token') //pegar token

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
      await createUserToken(newUser, req, res) //Token
      /* trocaremos este código pelo token criado
          res.status(201).json({ message: 'User created successfully!', newUser })
      */      
    } 
    catch(error) {
      res.status(500).json({ message: error })
    }
  }
  
    //login
    static async login(req, res) {
      const { email, password }  = req.body

      if (!email) {
        res.status(422).json({ message: 'Email is mandatory!' })
        return
      }

      if (!password) {
        res.status(422).json({ message: 'Password is required!' })
        return
      }

      //verificar se o usuario existe
      const user = await User.findOne({ email: email })

      if (!user) {
        res.status(422).json({ message: 'There is no user registered with this email!' })
        return
      }

      //verificar se senha confere com a do bd
      const checkpassword = await bcrypt.compare(password, user.password)

      if (!checkpassword) {
        res.status(422).json({ message: 'Invalid password!' })
        return
      }
      
      //Token - Depois de usuário e senha veificados o token libera o login
      await createUserToken(user, req, res) 
    }

    //checar o usuário pelo token
    static async checkUser(req, res) {

      let currentUser //variável que mudará e contem o usuário que está sendo verificado

      if (req.headers.authorization) {

        const token = getToken(req) //passar o token
        const decoded = jwt.verify(token, 'nossosecret') //verifica e valida o token e o nosso 'secret'
        
        //o verify do jwt traz todas as informações do usuário verificado (currentUser)
        currentUser = await User.findById(decoded.id) //extrair o usuário a partir do token
        currentUser.password = undefined // IMPORTANTE!!!! COMO TRAZ AS INFORMAÇÕES DEVE-SE ZERAR A SENHA!!!

      } else {

        currentUser = null
        
      }

      res.status(200).send(currentUser)
    }
}   