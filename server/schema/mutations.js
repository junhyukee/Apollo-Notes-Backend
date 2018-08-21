const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require('mongoose');
const Note = mongoose.model('note');
const NoteType = require('./note_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addNote: {
      type: NoteType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parentValue, { title, content, tags }) {
        return (new Note({ title, content, tags })).save()
      }
    },
    deleteNote: {
      type: NoteType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Note.remove({ _id: id });
      }
    },
    updateNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parentValue, { id, title, content, tags }) {
        return Note.findByIdAndUpdate(id, {
          title: title, 
          content: content, 
          tags: tags
        });
      }
    },
  }
});

module.exports = mutation;
