import { sequence } from 'astro:middleware';
import { createSessionClientFromRequest } from '../server/appwrite';
import type { MiddlewareHandler } from 'astro';
import type { Models } from 'node-appwrite';

const session: MiddlewareHandler = async ({ request, locals }, next) => {
  try {
    const { account } = createSessionClientFromRequest(request);
    locals.user = await account.get();
  } catch {}

  return next();
};

const loggedInRedirect: MiddlewareHandler = async ({ url, locals }, next) => {
  const { user } = locals as { user?: Models.User<Models.Preferences> };
  if (user && url.pathname.startsWith('/account')) {
    return Response.redirect(new URL('/dashboard', url), 302);
  }
  return next();
};

const noAuthRedirect: MiddlewareHandler = async ({ url, locals }, next) => {
  const { user } = locals as { user?: Models.User<Models.Preferences> };
  console.log(user);
  if (!user && url.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/account/login', url), 302);
  }
  return next();
};

const unverifiedRedirect: MiddlewareHandler = async ({ url, locals }, next) => {
  const { user } = locals as { user?: Models.User<Models.Preferences> };
  if (user && !user.emailVerification && url.pathname.startsWith('/dashboard') ) {
    return Response.redirect(new URL('/user/verify', url), 302);
  }
  return next();
};

export const onRequest = sequence(session, noAuthRedirect, loggedInRedirect, unverifiedRedirect);
