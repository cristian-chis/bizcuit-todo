import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Project, ProjectProps } from './Project';

export const GET_PROJECTS = gql`
	{
		projects {
			id
			name
			description
		}
	}
`;

export function Projects() {
	const { loading, error, data } = useQuery(GET_PROJECTS);
  
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error {error.message}</p>;

  	return (
		<table className="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.projects.map((project: ProjectProps) => <Project key={project.id} id={project.id} name={project.name} description={project.description} /> )}
			</tbody>
		</table>
		
	);
}