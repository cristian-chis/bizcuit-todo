import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_PROJECTS } from './Projects';

const CREATE_PROJECT = gql`
	mutation CreateProject($name: String!, $description: String!) {
		createProject(name: $name, description: $description) {
			id
			name
		}
	}
`;

export function ProjectCreateForm() {
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	
	const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
		refetchQueries: [{ query: GET_PROJECTS }]
	});

	if (error) return <p>Error: {error.message}</p>;

	const handleSubmit: React.FormEventHandler = (event) => {
		event.preventDefault();
		createProject({ variables: { name, description } });
		setName('');
		setDescription('');
	}

	return (
		<form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column'}}>
			<input type="text" placeholder="Project name" value={name} onChange={(event) => setName(event.target.value)} required />
			<textarea placeholder="Project description" value={description} onChange={(event) => setDescription(event.target.value)} required />
			<button disabled={loading} style={{ padding: '10px', backgroundColor: '#4839ac', color: 'white', fontSize: '18px' }}>Add project</button>
		</form>
	)
}