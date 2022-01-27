const jwt = require('jsonwebtoken')

const User = require('../models/User')

//pegar o usuário pelo token jwt no model User
const getUserByToken = async (token) => {

  //caso não venha nenhum token
  if (!token) {
    return res.status(401).json({ message: 'Access denied!'})
  }

  const decoded = jwt.verify(token, 'nossosecret') //armazena e verifica o token do usuário  

  const userId = decoded.id // variável (userId) armazena e acrescenta o id no token

  const user = await User.findOne({ _id: userId }) //variavel user encontra o usuário pelo id

  return user //retorna o user (usuário)

}

module.exports = getUserByToken