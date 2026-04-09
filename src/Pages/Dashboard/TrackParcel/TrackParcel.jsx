//  import React, { useState } from "react";
// import UseAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  // const [response, setResponse] = useState(null);

  // const axiosSecure = UseAxiosSecure();

  // const updateTracking = async ({
  //   tracking_id,
  //   parcel_id,
  //   status,
  //   message,
  //   location,
  //   updated_by,
  // }) => {
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(null);
  //   setResponse(null);

  //   try {
  //     const res = await axiosSecure.patch(`/tracking/${tracking_id}`, {
  //       parcel_id,
  //       status,
  //       message,
  //       location,
  //       updated_by,
  //       updated_at: new Date(),
  //       updated_at_string: new Date().toISOString(),
  //     });

  //     setResponse(res.data);
  //     setSuccess("Tracking updated successfully");
  //     return res.data;
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Failed to update tracking");
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return <div></div>;
};

export default TrackParcel;
