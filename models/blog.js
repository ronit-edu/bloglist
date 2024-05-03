const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returned_object) => {
    returned_object.id = returned_object._id.toString()
    delete returned_object._id
    delete returned_object.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)