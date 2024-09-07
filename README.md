# Astro + Appwrite with Auth Flow

This is a starter project for [Appwrite.io](https://astro.build/) using [Astrojs](https://astro.build/) and React with a basic working auth flow.

Working auth methods:
- Email + password
- Google

## Enviroment variables

In order to work you must configure the next enviroment variables in your project root ``/env/.env``

````
PUBLIC_APPWRITE_ENDPOINT=
PUBLIC_APPWRITE_PROJECT=
APPWRITE_KEY=
````

## Routes

The Auth flow uses these routes:

- ``/account/login``: User login
- ``/account/register``: User register
- ``/account/reset-password``: Recover password
- ``/account/forgot-password``: Set new password after recovery
- ``/account/oauth``: Oauth flow

- ``/user/verify``: Screen to ensure every logged in user has verified email address. You can skip this restriction removing the ``unverifiedRedirect`` middleware inside ``/middleware/index.ts``
- ``/user/verify-email``: Route to verify email after verification mail has been sent, the link will have this route.
- ``/user/logout``: User logout (remove cookies and session)

- ``/dasboard``: Dashboard visible when user has logged in an email is verified.
