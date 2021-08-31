import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { ProjectTime, ProjectTimeProps } from '../components/ProjectTime';
import { ProjectTimeCreateForm } from '../components/ProjectTimeCreateForm';
import { ProjectTimes } from '../components/ProjectTimes';

export const GET_PROJECT = gql`
	query GetProject($id: ID!) {
		project(id: $id) {
			id
			name
			description
			times {
				id
				description
				amount
			}
		}
	}
`;

interface RouteParams {
	id: string;
}

export function Project() {
	const { id: projectId } = useParams<RouteParams>();

	const { data, loading, error } = useQuery(GET_PROJECT, { variables: { id: projectId } });

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>
	if (!data.project) return <p style={{ fontWeight: 'bold', color: 'red' }}>404 - Project not found</p>

	const totalTime = data.project.times
		? data.project.times.reduce((accumulator: number, current: ProjectTimeProps) => accumulator + current.amount, 0)
		: 0;

	return (
		<>
			<h1>Name: {data.project.name}</h1>
			<hr />
			<div>
				<h4>Description: </h4>
				<p>{data.project.description}</p>
			</div>
			<div>
				<h4>Total hours: </h4>
				<p>{totalTime}</p>
			</div>
			<br />
			<h3 style={{ textAlign: 'center' }}>Create time</h3>
			<ProjectTimeCreateForm projectId={projectId} />
			<br />
			<ProjectTimes project={data.project} />
		</>
	)

}