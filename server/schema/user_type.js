const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        username: { type: GraphQLString }
    }
})

module.exports = UserType;