import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

var moment = require('moment');

const Card = props => {
	const rsvpdate = moment(props.detail.rsvpdeadline).format('DD MMM, YYYY');
	const edate = moment(props.detail.eventdate).format('DD MMM, YYYY');
	let imagename = '/img/';
	let iname = imagename.concat(props.detail.eventtype, '.jpeg').toLowerCase();
	console.log(iname);
	if (props.detail.eventtype) {
		return (
			<div className="d-flex flex-column justify-content-center graduation">
				<h3> {props.detail.eventtype} Party </h3>
				<div>
					<p>
						{' '}
						<b>{props.detail.eventtitle}</b>
					</p>
				</div>
				<div>
					<img src={iname} alt="invite" width={400} height={300} />
				</div>
				<br />

				<div>
					<p>
						{' '}
						<b>{props.detail.hostedby}</b> <small>is hosting a party on</small>{' '}
						<b>{edate}</b> at <small>{props.detail.location}</small>
					</p>
				</div>

				<div>
					<p>
						{' '}
						<small>RSVP by</small> <b>{rsvpdate}</b>
					</p>
				</div>

				<div>
					<p>
						<b>Ph:</b> <small>{props.detail.phonenumber}</small>, <b>Email:</b>{' '}
						<small>{props.detail.email}</small> <br />
					</p>
				</div>
			</div>
		);
	}
	return '';
};

export default Card;
