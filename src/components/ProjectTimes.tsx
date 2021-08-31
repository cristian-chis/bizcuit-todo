import React from 'react';
import { ProjectProps } from './Project';
import { ProjectTime } from './ProjectTime';

interface ProjectTimesProps {
	project: ProjectProps;
}

export function ProjectTimes({ project } : ProjectTimesProps) {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Description</th>
					<th>Amount</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{project.times && project.times.map((time) => <ProjectTime key={time.id} projectId={project.id} id={time.id} description={time.description} amount={time.amount} />)}
			</tbody>
		</table>
	)
}