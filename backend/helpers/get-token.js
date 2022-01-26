//requisição para extrair o token
const getToken = (req) => {

  const authHeader = req.headers.authorization //capturar o token do header
  
  //extrair o token (authHeader) e excluir a palavra Bearer [0] do token [1]
  const token = authHeader.split(' ')[1] //split ('espaço para array') [pegar segundo elemento = 1]

  return token

}

module.exports = getToken