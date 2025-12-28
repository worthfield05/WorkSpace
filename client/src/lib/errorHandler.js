export const applyServerErrors = (error, form) => {
  const data = error?.response?.data;

  if (!data?.errors?.fieldErrors) return;

  Object.entries(data.errors.fieldErrors).forEach(([field, messages]) => {
    form.setError(field, {
      type: "server",
      message: messages[0],
    });
  });
};
