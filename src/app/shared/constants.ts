// LOCAL STORAGE
export const LS_USER_LANGUAGE = 'language';
// REGEX PATTERNS

export const DIGIT_PATTERN = /\d/;
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

// export const LS_USER_TOKEN
// export const LS_USER_LANGUAGE
// kucaj ovde regex i ostale stvari sto ti trebaju
