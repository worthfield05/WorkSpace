import {
  Button,
  Card,
  Center,
  Container,
  Field,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { loginAPI } from "../apis/auth";
import { Link } from "react-router";

const LoginPage = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const queryClient = useQueryClient();
  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (values) => {
      await loginAPI(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (values.email !== "" || values.password !== "") {
      mutate(values);
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
          <Card.Title>Welcome back</Card.Title>
          <Card.Description>Login to continue</Card.Description>
          <VStack mt={2} justifyContent={"center"}>
            <Button w={"full"}>Continue with Google</Button>
            <Button w={"full"}>Continue with Facebook</Button>
          </VStack>
        </Card.Root>
        <form onSubmit={onSubmit}>
          <VStack gap={"4"}>
            <Field.Root required>
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
              <Input
                placeholder="me@example.com"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </Field.Root>
            <Button
              loading={isPending}
              disabled={isPending}
              w={"full"}
              type="submit"
            >
              Login
            </Button>
            {isError && (
              <Text color="red.500">
                {error?.response?.data?.message || "Login failed"}
              </Text>
            )}
            <Text>
              Don't have an account?
              <Link to={"/register"}> Sign up</Link>
            </Text>
          </VStack>
        </form>
      </Container>
    </Center>
  );
};

export default LoginPage;
