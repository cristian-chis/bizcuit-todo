import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_PROJECT } from '../layouts/Project';

const CREATE_PROJECT_TIME = gql`
	mutation CreateProjectTime($projectId: ID!, $description: String!, $amount: Int!) {
		addProjectTime(projectId: $projectId, description: $description, amount: $amount) {
			id
			description
			amount
		}
	}
`;

interface ProjectTimeCreateFormProps {
	projectId: string;
}

export function ProjectTimeCreateForm({ projectId }: ProjectTimeCreateFormProps) {
	const [description, setDescription] = React.useState('');
	const [amount, setAmount] = React.useState('');
	
	const [addProjectTime, { loading, error }] = useMutation(CREATE_PROJECT_TIME, {
		refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }]
	});

	if (error) return <p>Error: {error.message}</p>;

	const handleSubmit: React.FormEventHandler = (event) => {
		event.preventDefault();
		addProjectTime({ variables: { projectId, description, amount: +amount } });
		setDescription('');
		setAmount('');
	}

	return (
		<form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column'}}>
			<textarea placeholder="Time description" value={description} onChange={(event) => setDescription(event.target.value)} required />
			<input type="number" placeholder="Time amount" value={amount} onChange={(event) => setAmount(event.target.value)} required />
			<button disabled={loading} style={{ padding: '10px', backgroundColor: '#4839ac', color: 'white', fontSize: '18px' }}>Add time</button>
		</form>
	)
}