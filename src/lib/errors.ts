const errors: Record<string, string> = {
    'oauth': 'There was an error with the Sign in provider. Please try again.'
};

export const getError = (key: string) => errors[key] || 'An unknown error occurred.';