import { useMutation } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "./useAxiosSecure";

const UseTrackingLogger = () => {
  const axiosSecure = UseAxiosSecure();

  // ✅ mutation
  const { mutateAsync: logTracking, isPending } = useMutation({
    mutationFn: async ({
      tracking_id,
      status,
      details,
      location,
      updated_by,
    }) => {
      const payload = {
        tracking_id,
        status,
        details,
        location,
        updated_by,
      };

      const res = await axiosSecure.post("/trackings", payload);
      return res.data;
    },
  });

  return { logTracking, isPending };
};

export default UseTrackingLogger;
