import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const GuestList = props => {
	const [newGuest, setNewGuest] = useState([]);
	const [allGuest, setAllGuest] = useState([]);
	const [allSend, setAllSend] = useState([]);
	const toSend = {
		from_name: 'Neet',
		to_name: '',
		reply_to: '',
		message: ''
	};
	let counter = 0;
	const guesturl = 'https://rsvpneet.herokuapp.com/#/guest/' + props.data._id;
	console.log(props.data._id);
	console.log(guesturl);

	const createEmailList = e => {
		const temp = e.target.value;
		toSend.from_name = 'Neet';
		toSend.to_name = temp;
		toSend.reply_to = temp;
		toSend.message = guesturl;
		console.log(toSend);
		setAllSend([...allSend, toSend]);
		console.log(allSend);
	};

	const sendEmail = async e => {
		e.preventDefault();
		console.log('entered function sendemail');
		console.log(allSend);
		allSend.forEach(guest => {
			setTimeout(function() {}, 1000);
			emailjs
				.send(
					'service_xevsztj',
					'template_o12gykt',
					guest,
					'user_zrcdHjhE7l9Mhl3vqzGCR'
				)
				.then(
					result => {
						console.log(result.text);
					},
					error => {
						console.log(error.text);
					}
				);
		});
	};
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/rsvp/guestlist');
				const data = await response.json();
				setAllGuest([...allGuest, ...data]);
				console.log(data);
				//createEmailList();
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleChange = e => {
		setNewGuest({ ...newGuest, [e.target.id]: e.target.value });
	};

	const createNewGuest = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/rsvp/guestlist', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newGuest)
			});
			const data = await response.json();
			console.log(data);
			setAllGuest([...allGuest, data]);
			setNewGuest({ name: '', email: '', phonenumber: '' });
		} catch (error) {
			console.error(error);
		}
	};

	allGuest.sort((a, b) => (a.name > b.name ? 1 : -1));

	return (
		<div>
			<form className="buttonGuestList" onSubmit={createNewGuest}>
				<div className="form-group guestvew">
					<label for="name">Name</label>
					&nbsp;
					<input
						type="text"
						id="name"
						name="name"
						value={newGuest.name}
						onChange={handleChange}
					/>{' '}
					<br />
				</div>
				<div className="form-group guestvew">
					<label for="email">Email</label>
					&nbsp;
					<input
						type="text"
						id="email"
						name="email"
						onChange={handleChange}
						value={newGuest.email}
					/>
					<br />
				</div>

				<div className="form-group guestvew">
					<label for="phone">Phone Number</label>
					&nbsp;
					<input
						type="text"
						id="phonenumber"
						name="phonenumber"
						onChange={handleChange}
						value={newGuest.phonenumber}
					/>
					<br />
				</div>
				<div className="form-group guestvew">
					<input type="submit" value="Add Guest" />
				</div>
			</form>
			<div className="flexform">
				<div className="flex-row">
					<form className="form-group guestlist font-weight-light">
						<div>
							<h3>Guest List</h3>
							<br />

							{allGuest.map(each => {
								return (
									<div>
										<input
											type="checkbox"
											id={each._id}
											value={each.email}
											onClick={createEmailList}
										/>
										&nbsp; &nbsp;
										<label for={each._id}> {each.name} </label>
									</div>
								);
							})}
							<br />
						</div>
						<input
							className="btn btn-outline-light btn-dark btn-sm"
							type="submit"
							onClick={sendEmail}
							value="Send Invite"
						/>
					</form>
				</div>
				<div className="guestlistdb">
					<h3>Guest List Dashboard</h3>
					<br />

					<table class="table table-bordered">
						<thead>
							<tr>
								<th>#</th>
								<th>Full Name</th>
								<th>Status</th>
								<th># Guests</th>
							</tr>
						</thead>
						<tbody>
							{allGuest.map(each => {
								counter = counter + 1;
								return (
									<tr>
										<th scope="row">{counter}</th>
										<td>{each.name}</td>
										<td>
											{each.responsemessage === 'Thanks , See you soon !!'
												? 'Accepted'
												: each.responsemessage ===
												  'No Problem , See you next time !!'
												? 'Declined'
												: 'No Response'}
										</td>
										<td>{each.howmany}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default GuestList;
