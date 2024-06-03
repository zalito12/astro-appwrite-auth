import { createAdminClient } from '@/server/appwrite';
import { setCookieSession } from '@/server/auth';
import type { APIRoute } from 'astro';
import { OAuthProvider } from 'node-appwrite';

export const prerender = false;

export const POST: APIRoute = async ({ redirect, url, request }) => {
  const data = await request.formData();
  const provider = data.get('provider') as string;
  if (!provider || !Object.values(OAuthProvider).includes(provider as OAuthProvider)) {
    return redirect('/account/register?from=oauth');
  }

  // Create the Appwrite client
  const { account } = createAdminClient();

  // Create an OAuth token
  const redirectUrl = await account.createOAuth2Token(
    provider as OAuthProvider,
    `${url.origin}/account/oauth`,
    `${url.origin}/account/register?from=oauth`
  );

  // Redirect the end-user to the OAuth2 provider authentication
  return redirect(redirectUrl);
};

export const GET: APIRoute = async ({ redirect, cookies, url }) => {
  // Get the user ID and secret from the URL
  const userId = url.searchParams.get('userId') as string;
  const secret = url.searchParams.get('secret') as string;

  // Create the Appwrite client
  const { account } = createAdminClient();

  // Exchange the token for a session
  const session = await account.createSession(userId, secret);
  setCookieSession(cookies, session);

  // Redirect the logged in user to the account page
  return redirect('/dashboard');
};
