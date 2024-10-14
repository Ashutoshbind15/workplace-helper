import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/user");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      } catch (e) {
        return null;
      }
    },
    retry: false,
    retryOnMount: false,
    staleTime: Infinity,
  });

  return {
    userdata: data,
    isUserLoading: isLoading,
    isUserError: isError,
    userError: error,
  };
};

export const useTeam = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["team", id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/teams/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      } catch (e) {
        return null;
      }
    },
    retry: false,
    retryOnMount: false,
    staleTime: Infinity,
  });

  return {
    teamdata: data,
    isTeamLoading: isLoading,
    isTeamError: isError,
    teamError: error,
  };
};
