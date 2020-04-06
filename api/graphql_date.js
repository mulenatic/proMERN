const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize: value => value.toISOString(),
  parseValue(value) {
    const dateValue = new Date(value);
    return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const dateValue = new Date(ast.value);
      return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
    }
    return undefined;
  },
});

module.exports = GraphQLDate;
