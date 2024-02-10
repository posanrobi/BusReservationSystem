//Profile page

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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

export const noUserData = (username, firstname, lastname, email) => {
  return !username || !firstname || !lastname || !email;
};

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

export const existNewAndConfirmPassword = (newPassword, confirmPassword) => {
  return (
    newPassword &&
    newPassword !== "" &&
    confirmPassword &&
    confirmPassword !== ""
  );
};

//Planning page

export const calculateTotalPrice = (selectedSeats, busLines) => {
  const totalPrice = selectedSeats.reduce((total, seat) => {
    const busLine = busLines.find((bl) => bl.id === seat.busLineId);
    const seatPrice = busLine?.price ?? 0;

    return total + seatPrice;
  }, 0);
  return totalPrice;
};
