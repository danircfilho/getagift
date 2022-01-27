const jwt = require('jsonwebtoken')

const getToken = require('./get-token') //reutilizando método para pegar o token

//middleware para validar o token
const checkToken = (req, res, next) => {
  //caso não haja nehuma autorização vinda do headers
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Access denied!' })
  }

  const token = getToken(req) //requisição para o token

  //caso não haja token é rejeitado a requisição
  if (!token) {
    return res.status(401).json({ message: 'Access denied!' })
  }

  try {

    //verificar o token ao recebe-lo (jwt)
    const verified = jwt.verify(token, 'nossosecret')
    req.user = verified
    next() //tudo certo pode prosseguir

  } catch(error) {
    //não conseguiu cai no catch
    return res.status(400).json({ message: 'Invalid Token!' })

  }
}

module.exports = checkToken