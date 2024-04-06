export function validateEmailPassword(email, password) {
  let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  let isPasswordValid =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";
}
