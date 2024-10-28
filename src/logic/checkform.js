export const notEmptyString = (str) => {
  if (!str) {
    return {
      errorMessage: "This field cannot be empty",
      title: "Invalid Input",
    };
  }
  return true;
};

// default value of min and max is undefined
export const numberInRange = (number, min, max) => {
  if (number === undefined || number === null) {
    return { errorMessage: "Number is required", title: "Invalid Number" };
  }
  if (typeof number !== "number") {
    return { errorMessage: "Must be a number", title: "Invalid Input" };
  }
  if (number < min || number > max) {
    return {
      errorMessage: `Number must be between ${min} and ${max}`,
      title: "Out of Range",
    };
  }
  return true;
};

// regex to check password
export const isEmail = (email) => {
  if (!email) {
    return { errorMessage: "Email is required", title: "Invalid Email" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
    ? true
    : { errorMessage: "Invalid email format", title: "Invalid Email" };
};

export const isPasswordCorrect = (password, re_password) => {
  if (!password || !re_password) {
    return {
      errorMessage: "Both password fields are required",
      title: "Invalid Password",
    };
  }
  if (password !== re_password) {
    return { errorMessage: "Passwords do not match", title: "Mismatch" };
  }
  if (password.length < 6) {
    return {
      errorMessage: "Password must be at least 6 characters long",
      title: "Invalid Password",
    };
  }
  return true;
};
