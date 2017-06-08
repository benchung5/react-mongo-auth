const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const articleSchema = new Schema({
  slug: { type: String, unique: true, lowercase: true },
  title: { type: String, unique: false },
  body: { type: String, unique: false }
});

// Create the model class
const ModelClass = mongoose.model('article', articleSchema);

// Export the model
module.exports = ModelClass;
