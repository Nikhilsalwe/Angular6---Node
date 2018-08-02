const mongoose = require('mongoose');

//This is the blue print created of data
const postSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true}
});

//here we can exporting this to use outside
module.exports = mongoose.model('Post', postSchema);
