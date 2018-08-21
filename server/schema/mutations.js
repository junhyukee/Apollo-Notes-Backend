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
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parentValue, { title, tags }) {
        return (new Note({ title, tags })).save()
      }
    },
    deleteNote: {
      type: NoteType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Note.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
