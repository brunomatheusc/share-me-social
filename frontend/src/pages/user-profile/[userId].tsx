import type { NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import { UserProfile } from 'container';

const UserProfilePage: NextPage = () => {
	return (
		<WithLayout layout={Main} component={UserProfile} />
	);
}

export default UserProfilePage;
