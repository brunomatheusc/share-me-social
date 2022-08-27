import React, { FC, createContext, useCallback, useState, useContext, useEffect, ReactNode } from "react";
import { CredentialResponse } from "@react-oauth/google";

import { client } from "providers/sanityClient";
import { userQuery } from "utils/data";
import { createOrGetUser } from "utils/fetchOrDecodeGoogleResponse";

interface AuthState {
	user: User;
}

interface SignInCredentials {
	googleId: string;
	wallet: string;
}

interface AuthContextData {
	user: User;
	setUser(user: User): void;
	signIn(credentials: SignInCredentials): Promise<void>;
	signUp(response: CredentialResponse): Promise<void>;
	signOut(): void;
}

interface AuthProviderProps {
	children?: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [data, setData] = useState<AuthState>(() => {
		if (typeof window !== "undefined") {
			const user = localStorage.getItem("@share-me:user");

			return !!user ? { user: JSON.parse(user) } : {} as AuthState;
		}

		return {} as AuthState;
	});

	function handleSetData(user: User) {
		localStorage.setItem("@share-me:user", JSON.stringify(user));
		setData({ user });
	}

	const signIn = useCallback(async ({ googleId }: SignInCredentials) => {
		try {
			const query = userQuery(googleId);
			const [response] = await client.fetch(query);
	
			handleSetData(response);
		} catch (error) {
			console.log("User not found");						
			console.log({ error });
		}
	}, []);

	const signUp = useCallback(async (response: CredentialResponse) => {
		const user = await createOrGetUser(response);
		const { name, picture, sub: googleId } = user;

		const doc = {
			_id: googleId,
			_type: 'user',
			userName: name,
			image: picture,
		};

		await client.createIfNotExists(doc);

		handleSetData({ _id: googleId, userName: name, image: picture } as User);
	}, []);

	const signOut = useCallback(async () => {
		localStorage.removeItem("@share-me:user");
		setData({} as AuthState);
	}, []);

	const setUser = useCallback((user: User) => {
		handleSetData(user);
	}, []);

	return (
		<AuthContext.Provider value={{ user: data.user, setUser, signIn, signUp, signOut }}>
			{ children }
		</AuthContext.Provider>
	);
}

export default function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within a Provider');
	}

	return context;
}