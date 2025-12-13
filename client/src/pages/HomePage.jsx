import { Button, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../apis/auth";

const HomePage = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return (
    <div>
      <Text>Welcome to WorkSpace Application</Text>
      <Button onClick={mutate}>Logout</Button>
    </div>
  );
};

export default HomePage;
