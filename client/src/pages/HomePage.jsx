import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMeAPI, logoutAPI } from "../apis/auth";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: ["me"], queryFn: getMeAPI });

  const { mutate } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  console.log(user);
  return (
    <div>
      <h1>Welcome to WorkSpace Application</h1>
      <Button onClick={mutate}>Logout</Button>
    </div>
  );
};

export default HomePage;
