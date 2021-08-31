import React, { useState } from 'react';
import Card from './card';

const InviteForm = props => {
	const [inviteEntry, setInviteEntry] = useState([]);

	const handleChange = e => {
		setInviteEntry({ ...inviteEntry, [e.target.id]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/rsvp/invite', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(inviteEntry)
			});
			const data = await response.json();
			setInviteEntry(data);
			props.changedata(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="inviteform">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label for="Event Type">Event Type</label> <br />
					<select
						id="eventtype"
						name="eventtype"
						value={inviteEntry.eventtype}
						onChange={handleChange}
					>
						<option value="Anniversary">Anniversary</option>
						<option value="Birthday">Birthday</option>
						<option value="Graduation">Graduation</option>
						<option value="Lunch">Lunch</option>
						<option value="Cocktail">Cocktail</option>
						<option value="bbq">BBQ </option>
						<option value="Wedding">Wedding Dinner</option>
					</select>
				</div>

				<div className="form-group">
					<label for="eventtitle">Event Title</label> <br />
					<input
						type="text"
						id="eventtitle"
						name="eventtitle"
						value={inviteEntry.eventtitle}
						onChange={handleChange}
					/>{' '}
					<br />
				</div>
				<div className="form-group">
					<label for="hostedBy">Hosted By</label>
					<br />
					<input
						type="text"
						id="hostedby"
						name="hostedby"
						onChange={handleChange}
						value={inviteEntry.hostedby}
					/>
					<br />
				</div>

				<div className="form-group">
					<label for="phonenumber">Phone Number</label>
					<br />
					<input
						type="text"
						id="phonenumber"
						name="phonenumber"
						onChange={handleChange}
						value={inviteEntry.phonenumber}
					/>
					<br />
				</div>
				<div className="form-group">
					<label for="email">Email</label>
					<br />
					<input
						type="text"
						id="email"
						name="email"
						onChange={handleChange}
						value={inviteEntry.email}
					/>
					<br />
				</div>
				<div className="form-group">
					<label for="eventdate">Event Date</label>
					<br />
					<input
						type="date"
						id="eventdate"
						name="eventdate"
						value={inviteEntry.eventdate}
						onChange={handleChange}
					/>
					<br />
				</div>

				<div className="form-group">
					<label for="location">Location Address</label>
					<br />
					<input
						type="text"
						id="location"
						name="location"
						value={inviteEntry.location}
						onChange={handleChange}
					/>
					<br />
				</div>
				<div className="form-group">
					<label for="rsvpdeadline">RSVP By Date </label>
					<br />
					<input
						type="date"
						id="rsvpdeadline"
						name="rsvpdeadline"
						onChange={handleChange}
						value={inviteEntry.rsvpdeadline}
					/>
					<br />
				</div>
				<input
					className="btn btn-dark btn-sm"
					type="submit"
					value="Create Invite"
				/>
			</form>
		</div>
	);
};

export default InviteForm;
