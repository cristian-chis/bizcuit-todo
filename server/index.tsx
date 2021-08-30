import { ApolloServer, gql } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';

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
		createProject (name: String!, description: String!): Project!
	}
`;

const projects: any = [];

const resolvers = {
	Query: {
		projects: () => projects
	},
	Mutation: {
		createProject: (root: any, args: any, context: any) => {
			const { name, description } = args;
			const uuid = uuidv4();
			const project = {
				id: uuid,
				name,
				description
			};
			projects.push(project);
			return project;
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Server started at: ${url}`);
});