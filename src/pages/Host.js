import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Host = () => {
	return (
		<div className="host">
			<h2> Life Is Better Together</h2>
			<p>Create online invitations for every celebration</p>
			<img src={'/img/party.png'} alt="invite" width={400} height={300} />
			<Link to="/invite">
				<button className="btn btn-dark" type="button ">
					Let's Create
				</button>
			</Link>
		</div>
	);
};

export default Host;
