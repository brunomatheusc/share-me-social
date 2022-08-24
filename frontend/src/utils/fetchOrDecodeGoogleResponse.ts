import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CredentialResponse } from '@react-oauth/google';

interface GoogleUserProps {
	name: string;
	picture: string;
	sub: string;
}

export async function createOrGetUser(response: CredentialResponse) {
	const decodedUser: GoogleUserProps = jwt_decode(response.credential!);

	return decodedUser;
}