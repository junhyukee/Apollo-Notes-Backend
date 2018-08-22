const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const NoteType = require('./note_type');
const Note = mongoose.model('note');
const UserType = require('./user_type')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    notes: {
      type: new GraphQLList(NoteType),
      resolve() {
        return Note.find({});
      }
    },
    note: {
      type: NoteType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Note.findById(id);
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    }
  })
});

module.exports = RootQuery;
