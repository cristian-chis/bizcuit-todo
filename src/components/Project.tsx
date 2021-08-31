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

export const ProjectItem = withRouter(({ match, location, history, ...props }: ProjectProps) => {
	const [name, setName] = React.useState(props.name);
	const [description, setDescription] = React.useState(props.description);
	const [isUpdating, setIsUpdating] = React.useState(false);

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		refetchQueries: [{ query: GET_PROJECTS }]
	});

	const [deleteProject] = useMutation(DELETE_PROJECT, {
		refetchQueries: [{ query: GET_PROJECTS }]
	});

	return (
		<tr className="table__item">
			<td className="table__item-cell">{
				isUpdating
					? <input type="text" placeholder="Project name" value={name} onChange={(event) => setName(event.target.value)} required />
					: name
			}</td>
			<td className="table__item-cell">{
				isUpdating
					? <textarea placeholder="Project description" value={description} onChange={(event) => setDescription(event.target.value)} required />
					: description
			}</td>
			<td className="table__item-cell table__item-cell-actions">
				<div style={{ display: 'flex', justifyContent: 'center' }}>{
					isUpdating
						? <>
							<button className="table__action-button table__action-button--update" onClick={(event) => {
								updateProject({ variables: { id: props.id, name, description } });
								setIsUpdating(false);
							}}>Update</button>
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
	);
});