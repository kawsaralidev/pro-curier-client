import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { FaArrowLeft, FaBoxOpen, FaMapMarkerAlt } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  const {
    data: parcel,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcel-details", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-xl border border-error/30 bg-error/10 p-6 text-center">
          <h2 className="text-xl font-semibold">Unable to load parcel</h2>
          <p className="mt-2 text-sm opacity-70">
            {error?.response?.data?.message || "Something went wrong."}
          </p>
          <Link
            to="/dashboard/myParcels"
            className="btn btn-primary mt-5"
          >
            <FaArrowLeft /> Back to My Parcels
          </Link>
        </div>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center">
        <FaBoxOpen className="mx-auto text-4xl opacity-50" />
        <h2 className="mt-3 text-xl font-semibold">Parcel not found</h2>
        <Link to="/dashboard/myParcels" className="btn btn-primary mt-5">
          <FaArrowLeft /> Back to My Parcels
        </Link>
      </div>
    );
  }

  const statusClass =
    parcel.delivery_status === "delivered"
      ? "badge-success"
      : parcel.delivery_status === "cancelled"
        ? "badge-error"
        : "badge-warning";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link
        to="/dashboard/myParcels"
        className="btn btn-ghost btn-sm"
      >
        <FaArrowLeft /> Back to My Parcels
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm opacity-60">Parcel Details</p>
          <h1 className="text-2xl font-bold md:text-3xl">
            {parcel.parcelName || "Parcel"}
          </h1>
        </div>
        <span className={`badge ${statusClass} badge-lg capitalize`}>
          {parcel.delivery_status || "pending"}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card border bg-base-100 shadow-sm lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Parcel Information</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Info label="Tracking ID" value={parcel.tracking_id} />
              <Info label="Parcel Type" value={parcel.type} />
              <Info label="Delivery Cost" value={parcel.cost} />
              <Info label="Payment Status" value={parcel.payment_status} />
              <Info label="Delivery Status" value={parcel.delivery_status} />
              <Info
                label="Created Date"
                value={
                  parcel.creation_date
                    ? new Date(parcel.creation_date).toLocaleString()
                    : "N/A"
                }
              />
            </div>
          </div>
        </section>

        <section className="card border bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">
              <FaMapMarkerAlt /> Delivery
            </h2>
            <Info label="Sender" value={parcel.senderName} />
            <Info label="Sender District" value={parcel.senderDistrict} />
            <Info label="Receiver" value={parcel.receiverName} />
            <Info label="Receiver District" value={parcel.receiverDistrict} />
            <Info label="Rider" value={parcel.rider_email || parcel.riderEmail} />
          </div>
        </section>

        <section className="card border bg-base-100 shadow-sm lg:col-span-3">
          <div className="card-body">
            <h2 className="card-title">Contact Information</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Info label="Sender Email" value={parcel.senderEmail} />
              <Info label="Sender Phone" value={parcel.senderPhone} />
              <Info label="Receiver Email" value={parcel.receiverEmail} />
              <Info label="Receiver Phone" value={parcel.receiverPhone} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide opacity-60">
      {label}
    </p>
    <p className="mt-1 break-words font-medium capitalize">
      {value || "N/A"}
    </p>
  </div>
);

export default ParcelDetails;
