export const usernameValidation = name =>
  2 < name.length && name.length < 31 && name.indexOf(" ") === -1;

export const passwordValidation = password =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/gm.test(password);

export const nameValidation = name =>
  name.length > 2 && name.length < 41 && name.indexOf(" ") === -1;

export const emailValidation = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
