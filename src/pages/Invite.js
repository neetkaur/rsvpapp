import React, { useState } from 'react';
import InviteForm from '../components/inviteform';
import Card from '../components/card';
import Glist from '../components/glist';

const Invite = props => {
	const [invitation, setInvitation] = useState([]);
	function fromChild(value) {
		setInvitation(value);
	}
	props.changedata(invitation);

	return (
		<div className="invite">
			<InviteForm data={invitation} changedata={fromChild} />
			<Card detail={invitation} />
			<Glist detail={invitation} />
		</div>
	);
};

export default Invite;
