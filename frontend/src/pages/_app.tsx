import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }: AppProps) {
	const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || '';

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<Head>
				<title>ShareME</title>
				<link rel="shortcut icon" href="/assets/favicon.png" />
				<link rel="apple-touch-icon" href="/assets/favicon.png" />
				<link rel="manifest" href="/manifest.json"/>

				<meta name="description" content="The best social share app" />

				<Script src="https://accounts.google.com/gsi/client" async defer></Script>
			</Head>

			<Component {...pageProps} />
		</GoogleOAuthProvider>
	);
}

export default MyApp
