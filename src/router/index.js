import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Host from '../pages/Host';
import Guest from '../pages/Guest';
import Invite from '../pages/Invite';
import Guestlist from '../pages/Guestlist';
import 'bootstrap/scss/bootstrap.scss';

const RSVPRouter = () => {
	const [invitation, setInvitation] = useState([]);
	function fromChild(value) {
		setInvitation(value);
	}

	return (
		<div>
			<Router>
				<nav className="navbar navbar-dark bg-dark">
					<Link className="link" to="/host">
						Host
					</Link>
					<Link className="link" to="/guest/:id">
						Guest
					</Link>
					<Link className="link" to="/invite">
						Invite
					</Link>
					<Link className="link" to="/guestlist">
						Guest List
					</Link>
				</nav>
				<Switch>
					<Route exact path="/host">
						<Host />
					</Route>
					<Route
						exact
						path="/guest/:id"
						render={routerProps => <Guest {...routerProps} />}
					></Route>
					<Route exact path="/invite">
						<Invite data={invitation} changedata={fromChild} />
					</Route>
					<Route exact path="/guestlist">
						<Guestlist data={invitation} changedata={fromChild} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default RSVPRouter;
