import React, { useState, useEffect } from 'react';

export const useDarkMode = () => {
	const [themeMode, setTheme] = useState('dark');
	const [mountedComponent, setMountedComponent] = useState(false);

	const setMode = (mode: string) => {
		window.localStorage.setItem('themeMode', mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		themeMode === 'light' ? setMode('dark') : setMode('light');
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('themeMode');
		localTheme ? setTheme(localTheme) : setMode('dark');
		setMountedComponent(true);
	}, []);

	return [themeMode, themeToggler, mountedComponent];
};

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

	const [themeMode, themeToggler, mountedComponent] = useDarkMode();

	return (
		<Layout themeMode={themeMode} themeToggler={themeToggler} {...rest}>
			<Component themeMode={themeMode} {...rest} />
		</Layout>
	);
}