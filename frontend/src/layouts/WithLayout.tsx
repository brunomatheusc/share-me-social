import React, { useEffect } from 'react';

interface Props {
	layout: any;
	component: any;
	// All other props
	[x: string]: any;
};

export default function WithLayout({ component: Component, layout: Layout, ...rest }: Props): JSX.Element {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');

		if (jssStyles && jssStyles.parentElement != null) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<Layout {...rest}>
			<Component {...rest} />
		</Layout>
	);
}