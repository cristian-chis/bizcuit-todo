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
	const descriptionInputRef = React.createRef<HTMLTextAreaElement>();
	const amountInputRef = React.createRef<HTMLInputElement>();

	const [isErrored, setIsErrored] = React.useState(false);
	
	const [addProjectTime, { loading, error }] = useMutation(CREATE_PROJECT_TIME, {
		refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }]
	});

	if (error) return <p>Error: {error.message}</p>;

	const handleSubmit: React.FormEventHandler = (event) => {
		event.preventDefault();

		// optional chaining not compiling (using caveman JS)
		const descriptionInputValue = descriptionInputRef.current && descriptionInputRef.current.value
			? descriptionInputRef.current.value
			: null
		const amountInputValue = amountInputRef.current && amountInputRef.current.value
			? +amountInputRef.current.value
			: -1

		if (descriptionInputValue && amountInputValue >= 0) {
			addProjectTime({ variables: { projectId, description: descriptionInputValue, amount: amountInputValue } });
			setIsErrored(false);
		} else {
			setIsErrored(true);
		}
	}

	return (
		<>
			{isErrored &&
				<p className="error">One or more fields could not be validated. Make sure you set a description and did not use a negative value for the amount.</p>
			}
			<form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column'}}>
				<textarea ref={descriptionInputRef} placeholder="Time description" required />
				<input ref={amountInputRef} type="number" placeholder="Time amount" required />
				<button disabled={loading} style={{ padding: '10px', backgroundColor: '#4839ac', color: 'white', fontSize: '18px' }}>Add time</button>
			</form>
		</>
	)
}