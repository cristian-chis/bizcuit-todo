import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import './App.css';

const GET_PROJECTS = gql`
	{
		projects {
			id
			name
			description
		}
	}
`;

const CREATE_PROJECT = gql`
	mutation CreateProject($name: String!, $description: String!) {
		createProject(name: $name, description: $description) {
			id
			name
		}
	}
`;

function Projects() {
	const { loading, error, data } = useQuery(GET_PROJECTS);
  
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error {error.message}</p>;
  
  	return data.projects.map((project: any) => {
		console.log({project});
		return (
			<div key={project.id}>
				<p>
					{project.id} - {project.name}: {project.description}
				</p>
			</div>
		);
	});
}

function FormAddProject() {
	const nameRef = React.createRef<HTMLInputElement>();
	const descriptionRef = React.createRef<HTMLInputElement>();
	
	const [createProject, { loading, error, data }] = useMutation(CREATE_PROJECT);

	const handleSubmit: React.FormEventHandler = (event) => {
		event.preventDefault();
		createProject({ variables: { name: 'name', description: 'description' } });
	}

	return (
		<form onSubmit={handleSubmit}>
			<input ref={nameRef} type="text" />
			<input ref={descriptionRef} type="text" />
			<button disabled={loading}>Submit</button>
		</form>
	)
}

function App() {
	return (
		<>
			<h1>My projects</h1>
			<Projects />
			<FormAddProject />
		</>
	);
}

export default App;
