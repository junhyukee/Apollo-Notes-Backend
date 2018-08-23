const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: { type: String },
  user: {
    type: String,
    ref: 'user'
  },
  content: { 
    type: String,
    ref: 'content'
  },
  tags: [{
    type: String,
    ref: 'tag'
  }]
});

mongoose.model('note', NoteSchema);
