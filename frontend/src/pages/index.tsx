import type { NextPage } from 'next';
import HomeContainer from 'container/Home';
import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';
import PinsContainer from 'container/Pins';
import { Feed } from 'components';

const Home: NextPage = () => {
	return (
		<WithLayout layout={Main} component={Feed} />
	);
}

export default Home;
