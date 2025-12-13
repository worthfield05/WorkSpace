import {
  Button,
  Card,
  Center,
  Container,
  Field,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { Link as routerLink } from "react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAPI } from "../apis/auth";
const RegisterPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    customError: "",
  });
  const queryClient = useQueryClient();
  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (values) => {
      await registerAPI(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password === values.confirmPassword) {
      const { email, password } = values;
      mutate({ email, password });
    } else {
      setValues({ ...values, customError: "Password doesn't match" });
    }
  };
  return (
    <Center h={"100vh"}>
      <Container
        py={"4"}
        maxW={{ sm: "100%", md: "md", lg: "lg" }}
        borderWidth={"1px"}
      >
        <Card.Root textAlign={"center"} border={0} bg={"transparent"} mb={4}>
          <Card.Title>Get Started</Card.Title>
          <Card.Description>
            Create your account to get started
          </Card.Description>
          <VStack mt={2} justifyContent={"center"}>
            <Button w={"full"}>Continue with Google</Button>
            <Button w={"full"}>Continue with Facebook</Button>
          </VStack>
        </Card.Root>
        <form onSubmit={onSubmit}>
          <VStack gap={"4"}>
            <Field.Root required invalid={false}>
              <Field.Label>
                Email
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="me@example.com"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                placeholder={"******"}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Confirm Password
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                placeholder={"******"}
                onChange={(e) =>
                  setValues({ ...values, confirmPassword: e.target.value })
                }
              />
            </Field.Root>
            <Button
              w={"full"}
              loading={isPending}
              disabled={isPending}
              type="submit"
            >
              Sign up
            </Button>
            {values.customError && (
              <Text color="red.500">{values.customError}</Text>
            )}
            {isError && (
              <Text color="red.500">
                {error?.response?.data?.message || "Login failed"}
              </Text>
            )}
            <Text>
              Already have an account?
              <Link as={routerLink} to={"/login"}>
                {" "}
                Login
              </Link>
            </Text>
          </VStack>
        </form>
      </Container>
    </Center>
  );
};

export default RegisterPage;
