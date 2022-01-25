const mongoose = require('../db/conn')
const { Schema } = mongoose

//const Thg
//Model Thg
//export Thg

const Thg = mongoose.model(
  'Thg',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color : {
        type: String,
        required: true,
      },
      image: {
        type: Array,
        require: true,
      },
      available: {
        type: Boolean,
      },
      user: Object,
      adopter: Object,
    },
    {timestamps: true}, //createdAt, updateAt (data da criação e atualização da data - mongoose)
  )
)

module.exports = Thg