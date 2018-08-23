const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Note = mongoose.model('note');
const UserType = require('./user_type');

const NoteType = new GraphQLObjectType({
  name:  'NoteType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    user: { 
      type: GraphQLString
     }
  })
});

module.exports = NoteType;
