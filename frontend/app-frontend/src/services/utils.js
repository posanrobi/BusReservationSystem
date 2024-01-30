export const handleInputChange = (fieldName) => (e) => {
  const value = e.target.value;
  switch (fieldName) {
    case "fullname":
      setFullname(value);
      break;
    case "username":
      setUsername(value);
      break;
    case "email":
      setEmail(value);
      break;
    case "password":
      setPassword(value);
      break;
    case "newPassword":
      setNewPassword(value);
      break;
    case "confirmPassword":
      setConfirmPassword(value);
      break;
    default:
      break;
  }
};
