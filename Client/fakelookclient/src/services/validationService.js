const usernameValidation = (name) => {
  return 2 < name.length && name.length < 31 && name.indexOf(" ") === -1;
};

const passwordValidation = (password) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/gm.test(
    password
  );
};

const nameValidation = (name) => {
  return name.length > 2 && name.length < 41 && name.indexOf(" ") === -1;
};

const emailValidation = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export {
  usernameValidation,
  passwordValidation,
  nameValidation,
  emailValidation,
};
