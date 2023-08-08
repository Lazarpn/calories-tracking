// LOCAL STORAGE
export const LS_USER_LANGUAGE = 'language';
export const LS_USER_TOKEN = 'token';
export const LS_USER_ROLES = 'roles';

// REGEX PATTERNS
export const DIGIT_PATTERN = /\d/;
export const POSITIVE_DIGIT_PATTERN = /[^0-9]/g;
export const UPPERCASE_PATTERN = /[A-Z]/;
export const LOWERCASE_PATTERN = /[a-z]/;
export const SPECIAL_CHARACTERS_PATTERN = /[^a-zA-Z0-9]/;
export const LENGTH_PATTERN = /^.{6,}$/;
export const PASSWORD_PATTERN = new RegExp(
  `^(?=.*${LOWERCASE_PATTERN.source})` +
    `(?=.*${UPPERCASE_PATTERN.source})` +
    `(?=.*${DIGIT_PATTERN.source})` +
    `(?=.*${SPECIAL_CHARACTERS_PATTERN.source})` +
    `${LENGTH_PATTERN.source}$`
);
