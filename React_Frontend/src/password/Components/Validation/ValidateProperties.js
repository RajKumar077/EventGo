/* @Author - password Makwana B00842568 */

export function validateEmail() {
  const { email } = this.state;
  let isEmailValid = true;
  let error = { ...this.state.error };

  // checks for email format _@_._
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    isEmailValid = false;
    error.email = "Please enter a valid email id";
  }

  this.setState({ isEmailValid, error }, this.validateForm);
}

export function validatePassword() {
  const { password } = this.state;
  let isPasswordValid = true;
  let error = { ...this.state.error };

  // Password must contain at least 6 chars
  // Password must contain at least one digit
  // Password must contain at least one special character

  if (password.length < 6) {
    isPasswordValid = false;
    error.password = "Password must be at least 6 characters long";
  } else if (!/\d/.test(password)) {
    isPasswordValid = false;
    error.password = "Password must contain at least one digit";
  } else if (!/[!@#$%^&*]/.test(password)) {
    isPasswordValid = false;
    error.password =
      "Password must contain at least one special character: !@#$%^&*";
  }

  this.setState({ isPasswordValid, error }, this.validateForm);
}

export function validateConfirmPassword() {
  const { confirmPassword, password } = this.state;
  let isConfirmPasswordValid = true;
  let error = { ...this.state.error };

  if (password !== confirmPassword) {
    isConfirmPasswordValid = false;
    error.confirmPassword = "Passwords do not match";
  }

  this.setState({ isConfirmPasswordValid, error }, this.validateForm);
}
