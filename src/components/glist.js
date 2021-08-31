import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
const guestLink = 'http://localhost:3000/invite';
const Glist = props => {
	if (props.detail.eventtype) {
		return (
			<div className="d-flex flex-row justify-content-end">
				<Link to="/guestlist">
					<img
						src="/img/glist.png"
						id="imgTag"
						alt=" glist"
						width={40}
						height={40}
					/>
				</Link>
				<Link to={`/guest/${props.detail._id}`}>
					<p>Actual Card is here</p>
				</Link>
				<p></p>
			</div>
		);
	} else return '';
};

export default Glist;
