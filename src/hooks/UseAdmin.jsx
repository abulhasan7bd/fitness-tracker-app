// hooks/UseUserInfo.js
import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import UseAuth from "./UseAuth";

const UseUserInfo = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const email = user?.email;

  const { data: userInfo = {}, isLoading, error } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${email}`);
      return res.data; 
    },
    enabled: !!email,
  });

  return { userInfo, isLoading, error };
};

export default UseUserInfo;
