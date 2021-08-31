import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/card';

const Guest = props => {
	const [guestCount, setGuestCount] = useState([]);
	const [guestEmail, setGuestEmail] = useState([]);
	const [showCard, setShowCard] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [showMsg, setShowMsg] = useState(false);
	const [message, setMessage] = useState('No Response');
	const [inviteData, setInviteData] = useState([]);
	const isMounted = useRef(false);
	let foundEmail = '';

	useEffect(() => {
		if (isMounted.current) {
			byeByeMessage();
		} else {
			isMounted.current = true;
		}
	}, [message]);

	const storeGuestCount = e => {
		setGuestCount({ guestCount, [e.target.id]: e.target.value });
	};
	const handleGuestEmail = e => {
		setGuestEmail({ ...guestEmail, [e.target.id]: e.target.value });
	};

	const fShowForm = () => {
		setShowButton(false);
		setShowForm(true);
	};
	const byeByeMessage = () => {
		console.log(message);
		setShowButton(false);
		setShowForm(false);
		setShowMsg(true);
		try {
			const response = fetch(`/api/rsvp/guest/response`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...guestEmail, message: message })
			});
		} catch (error) {
			console.error(error);
		}
	};

	const rsvpReject = async () => {
		const temp = 0;
		try {
			const response = await fetch(`/api/rsvp/guest`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ howmany: temp, ...guestEmail })
			});
			const data = await response.json();
			if (data) {
				setMessage('No Problem , See you next time !!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const sendGuestCount = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/rsvp/guest`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...guestCount, ...guestEmail })
			});
			const data = await response.json();
			if (data) {
				setMessage('Thanks , See you soon !!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const checkEmailShowCard = async e => {
		console.log('entered check email fn');
		e.preventDefault();
		try {
			const response = await fetch(`/api/rsvp/guest`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(guestEmail)
			});
			const data = await response.json();
			foundEmail = data.email;
		} catch (error) {
			console.error(error);
		}
		if (foundEmail === guestEmail.email) {
			console.log('entered fetch from link function');
			try {
				console.log('fetching');
				const response = await fetch(
					`/api/rsvp/guest/${props.match.params.id}`
				);
				const data = await response.json();
				setInviteData(data);
			} catch (error) {
				console.error(error);
			}
			console.log('this is invite' + inviteData);
			setShowCard(true);
			setShowButton(true);
		} else alert('Wrong Email, enter your email again...');
	};
	return (
		<div className="guestpage">
			{!showCard && (
				<form onSubmit={checkEmailShowCard} className="guestview">
					<label for="email">Enter your email: </label>
					<span>&nbsp;&nbsp;</span>
					<input
						type="text"
						id="email"
						name="email"
						onChange={handleGuestEmail}
						value={guestEmail.email}
					/>
					<span>&nbsp;&nbsp;</span>
					<input type="submit" value="OK" />
				</form>
			)}
			{showCard && (
				<div>
					<Card detail={inviteData} />
				</div>
			)}
			<div>
				{showButton && (
					<div>
						<button
							className="btn btn-outline-success btn-sm"
							onClick={fShowForm}
						>
							{' '}
							Will Surely Come !
						</button>
						<button
							className="btn btn-outline-danger btn-sm "
							onClick={rsvpReject}
						>
							{' '}
							Sorry, Cannot make it.{' '}
						</button>
					</div>
				)}
				{showForm && (
					<form onSubmit={sendGuestCount} className="guestview">
						<label for="howmany">
							How many people will join us (including yourself) ?
						</label>
						<span>&nbsp;&nbsp;</span>
						<input
							type="text"
							id="howmany"
							name="howmany"
							value={guestCount.howmany}
							onChange={storeGuestCount}
						/>
						<span>&nbsp;&nbsp;</span>
						<input type="submit" value="OK" />
					</form>
				)}
			</div>
			<div>{showMsg && <h3>{message}</h3>}</div>
		</div>
	);
};

export default Guest;
