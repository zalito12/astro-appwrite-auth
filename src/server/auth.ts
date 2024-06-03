import { type Models } from 'node-appwrite';
import type { AstroCookies } from 'astro';

const SESSION_COOKIE = '__session_web';
const SAME_SITE_COOKIE = '__session_site';

export const setCookieSession = (
  cookies: AstroCookies,
  session: Models.Session
) => {
  cookies.set(SESSION_COOKIE, session.secret, {
    sameSite: 'lax',
    expires: new Date(session.expire),
    secure: true,
    httpOnly: true,
    path: '/',
  });
  cookies.set(SAME_SITE_COOKIE, session.secret, {
    sameSite: 'strict',
    expires: new Date(session.expire),
    secure: true,
    httpOnly: true,
    path: '/',
  });
};

export const clearCookieSession = (cookies: AstroCookies) => {
  cookies.delete(SESSION_COOKIE, {
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
    path: '/',
  });
  cookies.delete(SAME_SITE_COOKIE, {
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
    path: '/',
  });
};

export const isSameSiteCookie = (cookies: AstroCookies) => {
  const laxSession = cookies.get(SESSION_COOKIE);
  const sameSiteSession = cookies.get(SAME_SITE_COOKIE);
  return laxSession?.value === sameSiteSession?.value;
}

export const getSessionCookie = (cookies: AstroCookies) => {
  return cookies.get(SESSION_COOKIE);
}