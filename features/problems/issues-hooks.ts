import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProblemEntity } from "./ProblemEntity";

const myIp: string = "192.168.1.9";

export const useGetIssues = () => {
  const fetchIssues = async () => {
    return await axios.get("http://" + myIp + ":3000/problems");
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchIssues,
  });

  return { isLoading, isError, data: data?.data, error };
};

export const usePostIssues = () => {
  return useMutation({
    mutationFn: (newProblem: ProblemEntity) => {
      return axios.post("http://" + myIp + ":3000/problems", newProblem);
    },
  });
};
