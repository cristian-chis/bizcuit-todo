import React from 'react';
import { ProjectCreateForm } from '../components/ProjectCreateForm';
import { Projects } from '../components/Projects';

export function Home() {
	return (
		<>
			<h3 style={{ textAlign: 'center' }}>New project</h3>
			<ProjectCreateForm />
			<h1 style={{ textAlign: 'center', marginTop: '40px' }}>My projects</h1>
			<Projects />
		</>
	)
}