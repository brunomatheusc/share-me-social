import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { googleLogout } from '@react-oauth/google';

import { AiOutlineLogout } from 'react-icons/ai';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from 'utils/data';
import useAuth from 'hooks/auth';

import { MasonryLayout, Spinner } from 'container/Home/components';
import { client } from 'providers/sanityClient';

const randomImage = 'https://source.unsplash.com/1600x400/?nature,photography,technology';

const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

export default function UserProfile() {
	const router = useRouter();

	const [user, setUser] = useState<User | null>(null)
	const [pins, setPins] = useState<Pin[] | null>(null);
	const [text, setText] = useState('Created');
	const [activeBtn, setActiveBtn] = useState('created');

	const userId =  router.query.userId as string; 

	useEffect(() => {
		(async () => {
			const query = userQuery(userId);
			const [userResponse] = await client.fetch(query);

			setUser(userResponse);
		})();
	}, [userId]);

	useEffect(() => {
		(async () => {
			const response = await client.fetch((text === 'created') ? userCreatedPinsQuery(userId) : userSavedPinsQuery(userId));
			setPins(response);
		})()
	}, [text, userId]);

	if (!user) return <Spinner message="Loading..." />

	return (
		<div className="relative pb-2 h-full justify-center items-center">
			<div className="flex flex-col pb-5">
				<div className="relative flex flex-col mb-7">
					<div className="flex flex-col justify-center items-center">
						<img 
							src={randomImage} 
							alt="banner-picture" 
							className="w-full h-370 2xl:h-510 shadow-lg object-cover"
						/>

						<img
							src={user.image}
							className="rounded-full w-20 h-20 -mt-10 shadow-l object-cover"
						/>

						<h1 className="font-bold text-3xl text-center mt-3">{ user.userName }</h1>

						<div className="absolute top-0 z-1 right-0 p-2">
						{ userId === user._id && (
							<button
								type="button"
								className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
								onClick={() => googleLogout()}
							>
								<AiOutlineLogout color="red" fontSize={21} />
							</button>							
						)}
						</div>
					</div>

					<div className="text-center mb-7 mt-4">
						<button 
							type="button"
							onClick={(e: any) => { 
								setText('created');
								setActiveBtn('created');
							}}
							className={`${activeBtn === 'created' ? 'bg-red-500 text-white' : 'bg-primary mr-4 text-black'} font-bold p-2 rounded-full w-20 outline-none`}
						>
							Created
						</button>
						
						<button 
							type="button"
							onClick={(e: any) => {
								setText('saved');
								setActiveBtn('saved');
							}}
							className={`${activeBtn === 'saved' ? 'bg-red-500 text-white' : 'bg-primary mr-4 text-black'} font-bold p-2 rounded-full w-20 outline-none`}
						>
							Saved
						</button>
					</div>
					
					{ pins?.length ? (
					<div className="px-2">
						<MasonryLayout pins={pins} />
					</div>
					) : (
						<div className="flex justify-center font-bold items-center w-full text-xl mt-2">No pins found!</div>
					)}
				</div>
			</div>
		</div>
	);
}
