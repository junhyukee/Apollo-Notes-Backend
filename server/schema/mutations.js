const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require('mongoose');
const Note = mongoose.model('note');
const NoteType = require('./note_type');
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

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
    signup: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { username, password }, req) {
        return AuthService.signup({ username, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { username, password }, req) {
        return AuthService.login({ username, password, req });
      }
    }
  }
});

module.exports = mutation;
