import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_PROJECT } from '../layouts/Project';

export interface ProjectTimeProps {
	projectId: string;
	id: string;
	description: string;
	amount: number;
}

const DELETE_PROJECT_TIME = gql`
	mutation DeleteProjectTime($projectId: ID!, $id: ID!) {
		deleteProjectTime(projectId: $projectId, id: $id)
	}
`;

export function ProjectTime({ projectId, id, description, amount }: ProjectTimeProps) {
	const [deleteProjectTime] = useMutation(DELETE_PROJECT_TIME, {
		refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }]
	});

	return (
		<tr className="table__item">
			<td className="table__item-cell">{description}</td>
			<td className="table__item-cell">{amount}</td>
			<td className="table__item-cell table__item-cell-actions">
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button className="table__action-button table__action-button--delete" onClick={(event) => deleteProjectTime({ variables: { projectId, id } })}>Delete</button>
				</div>
			</td>
		</tr>
	)
}