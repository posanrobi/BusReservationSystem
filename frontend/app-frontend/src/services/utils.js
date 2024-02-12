/**
 * Validation function for email.
 *
 * @param {String} email Email address of the user to be validated.
 * @returns {Boolean} True if email is valid, false if not valid.
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if there are any changes in the user data compared to the original data.
 *
 * @param {Object} originalData The original user data.
 * @param {String} username The new username.
 * @param {String} email The new email address.
 * @param {String} firstname The new first name.
 * @param {String} lastname The new last name.
 * @param {String} password The current password.
 * @param {String} newPassword The new password.
 * @param {String} confirmPassword The confirmation of the new password.
 * @returns {Boolean} True if there are any changes, false otherwise.
 */
export const checkDataChanges = (
  originalData,
  username,
  email,
  firstname,
  lastname,
  password,
  newPassword,
  confirmPassword
) => {
  return (
    originalData.username !== username ||
    originalData.email !== email ||
    originalData.firstname !== firstname ||
    originalData.lastname !== lastname ||
    password !== "" ||
    newPassword !== "" ||
    confirmPassword !== ""
  );
};

/**
 * Checks if the user data is empty.
 *
 * @param {String} username The username of the user.
 * @param {String} firstname The firstname of the user.
 * @param {String} lastname The lastname of the user.
 * @param {String} email The email address of the user.
 * @returns {Boolean} True if any user data is empty, false otherwise.
 */
export const noUserData = (username, firstname, lastname, email) => {
  return !username || !firstname || !lastname || !email;
};

/**
 * Checks if the password-related data is empty.
 *
 * @param {String} password The current password of the user.
 * @param {String} newPassword The new password of the user.
 * @param {String} confirmPassword The confirmation of the new password.
 * @returns {Boolean} True if any password-related data is empty, false otherwise.
 */
export const noPasswordData = (password, newPassword, confirmPassword) => {
  return (
    (password && !newPassword) ||
    (password && !confirmPassword) ||
    (newPassword && !confirmPassword) ||
    (newPassword && !password) ||
    (confirmPassword && !newPassword) ||
    (confirmPassword && !password)
  );
};

/**
 * Checks if both the new and confirm passwords are provided and not empty.
 *
 * @param {String} newPassword The new password.
 * @param {String} confirmPassword The confirmation of the new password.
 * @returns {Boolean} True if both new and confirm passwords are provided and not empty, false otherwise.
 */
export const existNewAndConfirmPassword = (newPassword, confirmPassword) => {
  return (
    newPassword &&
    newPassword !== "" &&
    confirmPassword &&
    confirmPassword !== ""
  );
};

/**
 * Calculates the total price of selected seats based on their associated bus lines.
 *
 * @param {Array} selectedSeats Array of selected seats.
 * @param {Array} busLines Array of bus lines containing price information.
 * @returns {Number} The total price of selected seats.
 */
export const calculateTotalPrice = (selectedSeats, busLines) => {
  const totalPrice = selectedSeats.reduce((total, seat) => {
    const busLine = busLines.find((bl) => bl.id === seat.busLineId);
    const seatPrice = busLine?.price ?? 0;

    return total + seatPrice;
  }, 0);
  return totalPrice;
};
