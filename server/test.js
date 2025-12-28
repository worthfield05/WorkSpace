const { registerSchema } = require("./schemas/auth.schema");
const data = {
  email: "",
  password: "",
};
const test = registerSchema.safeParse(data);
if (!test.success) {
  console.log({
    success: false,
    message: "Validation failed",
    errors: test.error.flatten(),
  });
}
