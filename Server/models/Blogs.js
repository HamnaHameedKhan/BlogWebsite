const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // Store image as base64 string
  date: { type: Date, default: Date.now },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Blog', BlogSchema);
