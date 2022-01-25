const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://localhost:27017/getathg')
  console.log('Connected to Database with Mongoose!')
}

main().catch((err) => console.log(err))

module.exports = mongoose