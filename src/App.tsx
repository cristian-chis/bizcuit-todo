import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Home } from './layouts/Home';
import { Project } from './layouts/Project';

function App() {
	return (
		<div style={{ width: '50%', margin: '0 auto' }}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/project/:id" exact>
						<Project />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
