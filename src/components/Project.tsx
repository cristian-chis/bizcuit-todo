import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GET_PROJECTS } from './Projects';
import { ProjectTimeProps } from './ProjectTime';

const UPDATE_PROJECT = gql`
	mutation UpdateProject($id: ID!, $name: String, $description: String) {
		updateProject(id: $id, name: $name, description: $description) {
			id
			name
			description
		}
	}
`

const DELETE_PROJECT = gql`
	mutation DeleteProject($id: ID!) {
		deleteProject(id: $id)
	}
`;

export interface ProjectProps extends RouteComponentProps {
	id: string;
	name: string;
	description: string;
	times?: ProjectTimeProps[];
}

export const Project = withRouter(({ match, location, history, ...props }: ProjectProps) => {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [isErrored, setIsErrored] = React.useState(false);

	const nameInputRef = React.createRef<HTMLInputElement>();
	const descriptionInputRef = React.createRef<HTMLTextAreaElement>();

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		refetchQueries: [{ query: GET_PROJECTS }]
	});

	const [deleteProject] = useMutation(DELETE_PROJECT, {
		refetchQueries: [{ query: GET_PROJECTS }]
	});

	const handleUpdate = () => {
		// optional chaining not compiling (using caveman JS)
		const nameInputValue = nameInputRef.current && nameInputRef.current.value
			? nameInputRef.current.value
			: null
		const descriptionInputValue = descriptionInputRef.current && descriptionInputRef.current.value
			? descriptionInputRef.current.value
			: null

		if (nameInputValue && descriptionInputValue) {
			updateProject({ variables: { id: props.id, name: nameInputValue, description: descriptionInputValue } });
			setIsUpdating(false);
		} else {
			setIsErrored(true);
		}
	}

	React.useEffect(() => {
		if (!isUpdating) {
			setIsErrored(false);
		}
	}, [isUpdating]);

	return (
		<>
			{isErrored &&
				<tr className="table__item">
					<td colSpan={3} className="error">One or more fields could not be validated. Make sure you set a value for both fields. Please check and submit again.</td>
				</tr>
			}
			<tr className="table__item">
				<td className="table__item-cell">{
					isUpdating
						? <input ref={nameInputRef} type="text" placeholder="Project name" defaultValue={props.name} required />
						: props.name
				}</td>
				<td className="table__item-cell">{
					isUpdating
						? <textarea ref={descriptionInputRef} placeholder="Project description" defaultValue={props.description} required />
						: props.description
				}</td>
				<td className="table__item-cell table__item-cell-actions">
					<div style={{ display: 'flex', justifyContent: 'center' }}>{
						isUpdating
							? <>
								<button className="table__action-button table__action-button--update" onClick={(event) => { handleUpdate(); }}>Update</button>
								<button className="table__action-button table__action-button--cancel" onClick={(event) => setIsUpdating(false)}>Cancel</button>
							</>
							: <>
								<button className="table__action-button table__action-button--view" onClick={(event) => history.push(`/project/${props.id}`) }>View</button>
								<button className="table__action-button table__action-button--update" onClick={(event) => setIsUpdating(true)}>Edit</button>
								<button className="table__action-button table__action-button--delete" onClick={(event) => deleteProject({ variables: { id: props.id } })}>Delete</button>
							</>
					}</div>
				</td>
			</tr>
		</>
	);
});