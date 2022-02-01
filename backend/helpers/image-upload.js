const multer = require('multer')
const path = require('path')

//destino para armazenar as imagens
const imageStorage = multer.diskStorage ({
  destination: function(req, file, cb) {

    //variável vazia" para receber e destinar a varios lugares
    let folder = ""

    //pela url destina-se a pasta (public pastas users e thgs)
    if(req.baseUrl.includes('users')) {
      folder = 'users'
    } else if (req.baseUrl.includes('thgs')) {
      folder = 'thgs'
    }

    //cb - call back (resultado da lógica, para onde foram os arquivos de imagens) 
    cb( null, `public/images/${folder}` )
  }, 

    filename: function(req, file, cb) {
      //string - math para numeros aleatórios com diferenças x 1000 (para não repetir alguma sequencia)
      cb( null, Date.now() + String(Math.random() * 1000) + path.extname(file.originalname))
    },
})

//configurar image upload
const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    //filtro lê apos o ponto e identifica a extensão do arquivo que deve ser png ou jpg
    if(!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('Please only insert png or jpg files'))
    }
    cb(undefined, true)
  }  
})

module.exports = { imageUpload }