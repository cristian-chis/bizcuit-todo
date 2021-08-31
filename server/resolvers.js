const { gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
let { projects } = require('./db');

const typeDefs = gql`
	type Project {
		id: ID!
		name: String!
		description: String!
		times: [Time!]
  	}

  	type Time {
		id: ID!
		description: String!
		amount: Int!
	}

	type Query {
		projects: [Project!]
	}

	type Mutation {
		createProject (name: String!, description: String!) : Project!
		deleteProject (id: ID!) : Boolean!
	}
`;

const resolvers = {
	Query: {
		projects: () => projects
	},
	Mutation: {
		createProject: (root, { name, description }, context) => {
			const uuid = uuidv4();
			const project = {
				id: uuid,
				name,
				description
			};
			projects.push(project);
			return project;
		},
		deleteProject: (root, { id }, context) => {
			projects = projects.filter((project) => project.id != id);
			return true;
		}
	}
}

module.exports = { typeDefs, resolvers };