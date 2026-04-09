import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email, // ✅ wait for auth
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data;
    },
  });

  return {
    role: data?.role || "user",
    roleLoading: loading || isLoading,
    isRoleError: isError,
    refetchRole: refetch,
  };
};

export default useUserRole;
