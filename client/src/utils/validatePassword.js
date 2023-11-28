const validatePassword = (password) => {
  const minLength = 6;

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long!`;
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter!";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one digit!";
  }

  return null;
};

export default validatePassword;
