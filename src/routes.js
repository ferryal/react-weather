import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Forecast from './schenes/Forecast';

const Routes = () => {
	return(
		<div>
			<Switch>
				<Route exact path="/" component={Forecast}/>
				<Redirect to="/" />
			</Switch>
		</div>
);
}

export default Routes;