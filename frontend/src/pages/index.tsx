import type { NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import { Feed } from 'components';

const Home: NextPage = () => {
	return (
		<WithLayout layout={Main} component={Feed} />
	);
}

export default Home;
