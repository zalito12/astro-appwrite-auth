import { sequence } from 'astro:middleware';
import { createSessionClientFromRequest } from '../server/appwrite';
import type { MiddlewareHandler } from 'astro';
import type { Models } from 'node-appwrite';
import { isSameSiteCookie } from '@/server/auth';

// Add user data to locals
const session: MiddlewareHandler = async ({ request, locals }, next) => {
  try {
    const { account } = createSessionClientFromRequest(request);
    locals.user = await account.get();
  } catch {}

  return next();
};

// Redirect authenticated users to the dashboard
const loggedInRedirect: MiddlewareHandler = async ({ url, locals }, next) => {
  const { user } = locals as { user?: Models.User<Models.Preferences> };
  if (user && url.pathname.startsWith('/account')) {
    return Response.redirect(new URL('/dashboard', url), 302);
  }
  return next();
};

// Redirect unauthenticated users to the login page
const noAuthRedirect: MiddlewareHandler = async ({ url, locals }, next) => {
  const { user } = locals as { user?: Models.User<Models.Preferences> };
  if (!user && url.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/account/login', url), 302);
  }
  return next();
};

// Redirect unverified email accounts to the verification page
const unverifiedRedirect: MiddlewareHandler = async ({ url, locals }, next) => {
  const { user } = locals as { user?: Models.User<Models.Preferences> };
  if (
    user &&
    !user.emailVerification &&
    url.pathname.startsWith('/dashboard')
  ) {
    return Response.redirect(new URL('/user/verify', url), 302);
  }
  return next();
};

// Prevent crsf attacks checking if the same site cookie is on the request on dashboard routes
const sameSiteRedirect: MiddlewareHandler = async ({ url, locals, cookies }, next) => {
  const { user } = locals as { user?: Models.User<Models.Preferences> };
  if (
    user &&
    url.pathname.startsWith('/dashboard') &&
    url.pathname !== '/dashboard' &&
    !isSameSiteCookie(cookies)
  ) {
    console.log('Not same site');
    return Response.redirect(new URL('/dashboard', url), 302);
  }
  return next();
};

export const onRequest = sequence(
  session,
  noAuthRedirect,
  loggedInRedirect,
  unverifiedRedirect,
  sameSiteRedirect
);
