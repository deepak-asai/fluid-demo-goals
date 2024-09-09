import { PublicClientApplication } from "@azure/msal-browser";

// Helper function to authenticate the user
export async function authHelper(): Promise<PublicClientApplication> {
	// Get the client id (app id) from the environment variables
	// const clientId = process.env.SPE_CLIENT_ID;
	const clientId = 'af9d633e-ea21-44a8-9575-429bfee7c907';
	if (!clientId) {
		throw new Error("SPE_CLIENT_ID is not defined");
	}

	// Create the MSAL instance
	const msalConfig = {
		auth: {
			clientId,
			authority: "https://login.microsoftonline.com/common/",
			tenantId: "common",
		},
	};

	// Initialize the MSAL instance
	const msalInstance = new PublicClientApplication(msalConfig);
	await msalInstance.initialize();

	return msalInstance;
}
