export function validateForm(formData, inputData, errorData) {
  let isValid = true;
  const newErrors = {};

  inputData.forEach((input) => {
    if (!formData[input]) {
      newErrors[input] = `${input} is required`;
      isValid = false;
    }
  });

  errorData(newErrors);
  return isValid;
}
