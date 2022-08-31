import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { client } from 'providers/sanityClient';
import { SanityImageAssetDocument } from '@sanity/client';

import useAuth from "hooks/auth";

import { Spinner } from 'container/Home/components';
import { categories } from 'utils/data';

export default function CreatePin() {
	const { user } = useAuth();
	const router = useRouter();

	const [title, setTitle] = useState('');
	const [about, setAbout] = useState('');
	const [destination, setDestination] = useState('');
	const [loading, setLoading] = useState(false);
	const [fields, setFields] = useState(false);
	const [category, setCategory] = useState('');
	const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(null);
	const [wrongImageType, setWrongImageType] = useState(false);

	async function handleUploadImage(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();

		if (!e.target.files) return;

		const selectedFile = e.target.files[0];
		const { type: contentType, name: filename } = selectedFile;

		if (!['image/png', 'image/svg', 'image/jpeg', 'image/gif', 'image/tiff'].includes(contentType)) {
			setWrongImageType(true);			
			return false;
		}
		
		setWrongImageType(false);
		setLoading(true);

		try {
			const documentResponse = await client.assets.upload('image', selectedFile, { contentType, filename });
			setImageAsset(documentResponse);
			setLoading(false);			
		} catch (error: any) {
			console.log("Image upload error: ", error.message);
		}
	}

	async function handleSavePin() {
		setLoading(true);

		if ([title, about, destination, imageAsset?._id, category].every(item => !!item)) {
			const doc = {
				_type: 'pin',
				title,
				about,
				destination,
				image: {
					_type: 'image',
					asset: {
						_type: 'reference',
						_ref: imageAsset?._id,
					}
				},
				userId: user._id,
				postedBy: {
					_type: 'postedBy',
					_ref: user._id
				},
				category
			};

			await client.create(doc);

			toast.success('Pin created!');

			setLoading(false);
			setTimeout(() => router.push('/'), 1000);
			
			return true;
		}
		
		setLoading(false);
		setFields(true);
		setTimeout(() => setFields(false), 2000);
	}

	return (
		<div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
		{ fields && (
			<p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">Please fill all the fields</p>
		)}
			<Toaster position="top-center" reverseOrder={false} />

			<div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
				<div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
					<div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
						{ loading && <Spinner />}
						
						{ wrongImageType && <p>Wrong image type</p> }
						
						{ !imageAsset ? (
							<label>
								<div className="flex flex-col items-center justify-center h-full">
									<div className="flex flex-col justify-center items-center">
										<p className="font-bold text-2xl">
											<AiOutlineCloudUpload />
										</p>

										<p className="text-lg">Click to upload</p>
									</div>

									<p className="mt-32 text-gray-400">Use high-quality JPG, SVG, PNG, GIT ou TIFF less than 20 MB</p>
								</div>

								<input 
									type="file"
									name="upload-file"
									onChange={(e) => handleUploadImage(e)}
									className="w-0 h-0"
								/>
							</label>
						) : (
							<div className="relative h-full">
								<img src={imageAsset.url} alt="uploaded-pic" className="h-full w-full" />

								<button 
									type="button"
									className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
									onClick={() => setImageAsset(null)}
								>
									<MdDelete />
								</button>
							</div>
						)}
					</div>
				</div>	

				<div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add your title here"
						className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
					/>

					{ user && (
						<div className="flex gap-2 my-2 items-center bg-white rounded-lg">
							<img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" referrerPolicy="no-referrer" />
							<p className="font-bold">{ user.userName }</p>
						</div>
					)}

					<input
						type="text"
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						placeholder="What is your pin about"
						className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
					/>

					<input
						type="text"
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
						placeholder="Add a destination link"
						className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
					/>

					<div className="flex flex-col">
						<div>
							<p className="mb-2 font-semibold text-lg sm:text-lg">Choose Pin Category</p>

							<select 
								name="category" 
								id="category"
								onChange={(e) => setCategory(e.target.value)}
								className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
							>
								<option value="other" className="bg-white">Select category</option>

							{ categories.map(category => (
								<option value={category.name} key={category.name} className="text-base border-0 outline-none capitalize bg-white text-black">
									{ category.name }
								</option>
							))}
							</select>
						</div>

						<div className="flex justify-end items-end mt-5">
							<button 
								type="button"
								onClick={() => handleSavePin()}
								className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
								disabled={loading}
							>
								Save Pin
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
