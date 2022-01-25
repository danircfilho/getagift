const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

  //criar o token
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, "nossosecret") //deve-se colocar caracteres diversos para um formato forte em segurança (nossosecret - para lembrar)

  //return token
  res.status(200).json({
    messsage: 'You are authenticated!',
    token: token,
    userId: user._id,
  })
}

module.exports = createUserToken