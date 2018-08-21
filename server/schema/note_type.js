const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Note = mongoose.model('note');

const NoteType = new GraphQLObjectType({
  name:  'NoteType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    tags: {
      type: new GraphQLList(GraphQLString),
    }
  })
});

module.exports = NoteType;