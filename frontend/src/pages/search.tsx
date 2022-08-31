import type { NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import { Search } from 'components';

const SearchPage: NextPage = () => {
	return (
		<WithLayout layout={Main} component={Search} />
	);
}

export default SearchPage;
