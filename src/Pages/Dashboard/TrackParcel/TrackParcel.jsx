import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaSearch, FaTruck } from "react-icons/fa";
import UseAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";

const TRACKING_STEPS = [
  {
    key: "pending",
    label: "Pending",
    description: "Parcel has been created and is waiting for pickup.",
  },
  {
    key: "picked-up",
    label: "Picked Up",
    description: "Parcel has been collected from the sender.",
  },
  {
    key: "in-transit",
    label: "In Transit",
    description: "Parcel is on the way to the destination.",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Parcel has been delivered successfully.",
  },
];

const STATUS_ALIASES = {
  pending: "pending",
  "picked up": "picked-up",
  "picked-up": "picked-up",
  pickup: "picked-up",
  "in transit": "in-transit",
  "in-transit": "in-transit",
  transit: "in-transit",
  delivered: "delivered",
};

const normalizeStatus = (status) => {
  if (!status) return "";
  const normalized = String(status).trim().toLowerCase();
  return STATUS_ALIASES[normalized] || normalized;
};

const getUpdateStatus = (update) =>
  normalizeStatus(
    update?.status ||
      update?.delivery_status ||
      update?.deliveryStatus ||
      update?.state
  );

const getUpdateDate = (update) =>
  update?.timestamp || update?.createdAt || update?.date || update?.updatedAt;

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const axiosPublic = UseAxios();

  const {
    data: trackingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracking", submittedId],
    enabled: Boolean(submittedId),
    queryFn: async () => {
      const res = await axiosPublic.get(`/trackings/${submittedId}`);
      return res.data;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = trackingId.trim();
    if (value) setSubmittedId(value);
  };

  const updates = Array.isArray(trackingData)
    ? trackingData
    : Array.isArray(trackingData?.data)
      ? trackingData.data
      : trackingData
        ? [trackingData]
        : [];

  const completedStatuses = new Set(updates.map(getUpdateStatus));

  // If the backend has tracking records but uses a later status,
  // mark all previous standard steps as completed as well.
  const highestCompletedIndex = Math.max(
    -1,
    ...TRACKING_STEPS.map((step, index) =>
      completedStatuses.has(step.key) ? index : -1
    )
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-5 lg:px-6">
      <div className="mb-6 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="border-b border-base-300 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-content">
              <FaTruck className="text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">Track Parcel</h1>
              <p className="text-sm opacity-65">
                Enter a tracking ID to see the delivery progress.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-4 sm:flex-row sm:p-6"
        >
          <input
            type="search"
            value={trackingId}
            onChange={(event) => setTrackingId(event.target.value)}
            className="input input-bordered h-12 w-full bg-base-200/40"
            placeholder="Enter tracking ID, e.g. PCL-20260812-1F7GQ"
          />
          <button
            type="submit"
            disabled={!trackingId.trim() || isLoading}
            className="btn btn-primary h-12 min-w-32"
          >
            <FaSearch />
            Track
          </button>
        </form>
      </div>

      {submittedId && isLoading && (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <Loading />
        </div>
      )}

      {submittedId && isError && (
        <div className="rounded-2xl border border-error/30 bg-error/10 p-6 text-center shadow-sm">
          <h2 className="font-semibold text-error">Tracking information not found</h2>
          <p className="mt-1 text-sm opacity-70">
            Please check the tracking ID and try again.
          </p>
        </div>
      )}

      {submittedId && !isLoading && !isError && (
        <TrackingTable
          trackingId={submittedId}
          updates={updates}
          completedStatuses={completedStatuses}
          highestCompletedIndex={highestCompletedIndex}
        />
      )}
    </div>
  );
};

const TrackingTable = ({
  trackingId,
  updates,
  completedStatuses,
  highestCompletedIndex,
}) => {
  const findUpdateForStep = (stepKey) => {
    return updates.find((update) => getUpdateStatus(update) === stepKey);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-2 border-b border-base-300 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-55">
            Tracking ID
          </p>
          <p className="font-mono text-sm font-semibold text-primary sm:text-base">
            {trackingId}
          </p>
        </div>

        {updates.length > 0 && (
          <span className="badge badge-success gap-1">
            <FaCheckCircle />
            Tracking found
          </span>
        )}
      </div>

      {updates.length === 0 ? (
        <div className="px-5 py-12 text-center sm:px-8">
          <h2 className="font-semibold">No tracking steps completed yet</h2>
          <p className="mt-1 text-sm opacity-60">
            The tracking record exists, but no status update is available yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop/tablet table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Tracking Step</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {TRACKING_STEPS.map((step, index) => {
                  const update = findUpdateForStep(step.key);
                  const isCompleted =
                    completedStatuses.has(step.key) ||
                    index <= highestCompletedIndex;

                  return (
                    <tr
                      key={step.key}
                      className={isCompleted ? "bg-success/5" : ""}
                    >
                      <td className="text-center font-semibold">{index + 1}</td>
                      <td>
                        <div className="font-semibold">{step.label}</div>
                        <div className="text-xs opacity-55">
                          {step.description}
                        </div>
                      </td>
                      <td>
                        {isCompleted ? (
                          <span className="badge badge-success gap-1">
                            <FaCheckCircle />
                            Completed
                          </span>
                        ) : (
                          <span className="badge badge-ghost">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap text-sm">
                        {update && getUpdateDate(update)
                          ? new Date(getUpdateDate(update)).toLocaleString()
                          : "—"}
                      </td>
                      <td className="max-w-xs text-sm opacity-75">
                        {update?.message ||
                          update?.details ||
                          update?.description ||
                          (isCompleted ? "Step completed." : "—")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile table-like layout */}
          <div className="divide-y divide-base-300 md:hidden">
            {TRACKING_STEPS.map((step, index) => {
              const update = findUpdateForStep(step.key);
              const isCompleted =
                completedStatuses.has(step.key) ||
                index <= highestCompletedIndex;

              return (
                <div
                  key={step.key}
                  className={`grid grid-cols-[36px_1fr] gap-3 p-4 ${
                    isCompleted ? "bg-success/5" : ""
                  }`}
                >
                  <div className="pt-0.5 text-center font-semibold">{index + 1}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{step.label}</h3>
                      {isCompleted ? (
                        <span className="badge badge-success badge-sm gap-1">
                          <FaCheckCircle />
                          Completed
                        </span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">—</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs opacity-55">{step.description}</p>
                    <p className="mt-2 text-xs opacity-65">
                      {update && getUpdateDate(update)
                        ? new Date(getUpdateDate(update)).toLocaleString()
                        : "—"}
                    </p>
                    {(update?.message ||
                      update?.details ||
                      update?.description) && (
                      <p className="mt-2 text-sm opacity-75">
                        {update.message || update.details || update.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackParcel;
