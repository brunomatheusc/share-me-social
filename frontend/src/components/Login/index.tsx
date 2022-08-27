import { useRouter } from 'next/router';

import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';

import { client } from 'providers/sanityClient';
import { createOrGetUser } from 'utils/fetchOrDecodeGoogleResponse';
import useAuth from 'hooks/auth';

export default function Login() {
	const router = useRouter();
	const { signUp } = useAuth();

	async function responseGoogle(response: CredentialResponse) {
		// const user = await createOrGetUser(response);
		// const { name, picture, sub: googleId } = user;

		// localStorage.setItem('user', JSON.stringify({ _id: googleId, googleId, name, imageUrl: picture }));

		// const doc = {
		// 	_id: googleId,
		// 	_type: 'user',
		// 	userName: name,
		// 	image: picture,
		// };

		// await client.createIfNotExists(doc);

		await signUp(response);

		router.push('/');
	}

	return (
		<div className="flex justify-start items-center flex-col h-screen">
			<div className="relative w-full h-full">
				<video
					src="/assets/share.mp4"
					loop
					controls={false}
					muted
					autoPlay
					className="w-full h-full object-cover"
				/>

				<div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
					<div className="p-5">
						<img src="/assets/logowhite.png" alt="logo" width="130xp" />
					</div>

					<div className="shadow-2xl">
						<GoogleLogin 
							// render={(renderProps) => (
							// 	<button
							// 		type="button"
							// 		className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
							// 		onClick={renderProps.onClick}
							// 		disabled={renderProps.disabled}
							// 	>
							// 		<FcGoogle className="mr-4" /> Sign in with Google
							// 	</button>
							// )}
							onSuccess={(response) => responseGoogle(response)}
							onError={() => console.log("ERROR")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
