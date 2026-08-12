import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import UseTrackingLogger from "../../hooks/useTrackingLogger";
import {
  FaBoxOpen,
  FaUser,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const generatedTrackingID = () => {
  {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
  }
};

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();
  const { logTracking } = UseTrackingLogger();
  // console.log(serviceCenters);

  // ================== REGIONS & DISTRICTS ==================
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  // ================== WATCH FORM FIELDS ==================
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // ================== SUBMIT HANDLER ==================
  const onSubmit = (data) => {
    console.log("Parcel Data:", data);

    const weight = Number(data.parcelWeight) || 0;
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    // ================== PRICING LOGIC ==================
    if (data.type === "document") {
      //  Document pricing
      baseCost = isSameDistrict ? 60 : 80;

      breakdown = `Document delivery ${
        isSameDistrict ? "within" : "outside"
      } the district`;
    } else {
      //  Non-Document pricing
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;

        breakdown = `Non-document up to 3kg ${
          isSameDistrict ? "within" : "outside"
        } the district`;
      } else {
        // > 3kg
        const extraKg = weight - 3;
        const perKgCharge = extraKg * 40;
        const districtExtra = isSameDistrict ? 0 : 40;

        baseCost = isSameDistrict ? 110 : 150;
        extraCost = perKgCharge + districtExtra;

        breakdown = `
Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.
Extra charge: tk40 x ${extraKg.toFixed(1)}kg = tk${perKgCharge}
${districtExtra ? "+ tk40 extra for outside district delivery" : ""}
      `;
      }
    }

    const totalCost = baseCost + extraCost;

    // ================== COST CONFIRMATION ==================
    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
      <div class="text-left text-base space-y-2">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Delivery Zone:</strong> ${
          isSameDistrict ? "Within Same District" : "Outside District"
        }</p>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${
          extraCost > 0
            ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>`
            : ""
        }
        <div class="text-gray-500 text-sm">${breakdown}</div>
        <hr class="my-2" />
        <p class="text-xl font-bold text-green-600">
          Total Cost: ৳${totalCost}
        </p>
      </div>
    `,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
    }).then((result) => {
      if (result.isConfirmed) {
        // ================== FINAL PARCEL DATA ==================
        const tracking_id = generatedTrackingID();
        const parcelData = {
          ...data,
          cost: totalCost,
          created_by: user?.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          tracking_id: tracking_id,
        };

        // Send to server here
        axiosSecure.post("/parcels", parcelData).then(async (res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Redirecting",
              text: "Proceeding to payment gateway",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            await logTracking({
              tracking_id: parcelData.tracking_id,
              status: "parcel_created",
              details: `Created by ${user.displayName}`,
              updated_by: user.email,
            });
            navigate("/dashboard/myParcels");
          }
        });
      }
    });
  };
  return (
    <div className="min-h-screen bg-white py-10 sm:py-14 lg:py-16">
      <div className="pc-container">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 px-5 py-8 shadow-[0_20px_60px_rgba(15,23,42,.06)] sm:px-8 sm:py-10 lg:px-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-50 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-700">
              <FaBoxOpen className="text-xs" /> Parcel delivery
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Send your parcel with{" "}
              <span className="text-teal-700">confidence.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Enter your shipment details and review the delivery cost before
              continuing to payment.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative mx-auto mt-10 max-w-5xl space-y-7"
          >
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal-700">
                    Step 01
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                    Parcel information
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:bg-teal-50">
                    <input
                      type="radio"
                      {...register("type", { required: true })}
                      value="document"
                      className="radio radio-sm"
                      defaultChecked
                    />
                    Document
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:bg-teal-50">
                    <input
                      type="radio"
                      {...register("type", { required: true })}
                      value="non-document"
                      className="radio radio-sm"
                    />
                    Non-Document
                  </label>
                </div>
              </div>
              {errors.type && (
                <p className="mt-3 text-sm font-semibold text-red-500">
                  Type is Required
                </p>
              )}
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-bold border-slate-200 bg-slate-100 text-slate-800">
                    Parcel Name
                  </span>
                  <input
                    type="text"
                    {...register("parcelName")}
                    className="input h-12 w-full rounded-xl border-slate-200 bg-white"
                    placeholder="e.g. Electronics package"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-bold text-slate-700">
                    Parcel Weight (kg)
                  </span>
                  <input
                    type="number"
                    step=""
                    {...register("parcelWeight")}
                    disabled={parcelType !== "non-document"}
                    className={`input h-12 w-full rounded-xl border-slate-200 ${parcelType !== "non-document" ? "cursor-not-allowed bg-slate-100" : "bg-white"}`}
                    placeholder="Enter weight"
                  />
                </label>
              </div>
            </section>

            <div className="grid gap-7 lg:grid-cols-2">
              <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                    <FaUser />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal-700">
                      Step 02
                    </p>
                    <h2 className="text-xl font-extrabold text-slate-950">
                      Sender details
                    </h2>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    {...register("senderName")}
                    defaultValue={user?.displayName}
                    className="input h-12 w-full rounded-xlborder-slate-200 bg-slate-100 text-slate-800"
                    placeholder="Sender Name"
                  />
                  <input
                    type="text"
                    {...register("senderEmail")}
                    defaultValue={user?.email}
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                    placeholder="Sender Email"
                  />
                  <select
                    {...register("senderRegion")}
                    className="select h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  >
                    <option value="">Select Region</option>
                    {uniqueRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("senderDistrict")}
                    defaultValue="Pick a district"
                    className="select h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  >
                    <option disabled>Pick a district</option>
                    {getDistrictsByRegion(senderRegion).map((region, i) => (
                      <option key={i} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <input
                    {...register("senderAddress", { required: true })}
                    placeholder="Sender Address"
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  />
                  <input
                    {...register("senderContact", { required: true })}
                    placeholder="Sender Contact No"
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  />
                  <textarea
                    {...register("pickupInstruction")}
                    placeholder="Pickup Instruction"
                    className="textarea min-h-24 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  />
                </div>
              </section>

              <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-600">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-amber-600">
                      Step 03
                    </p>
                    <h2 className="text-xl font-extrabold text-slate-950">
                      Receiver details
                    </h2>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <input
                    {...register("receiverName", { required: true })}
                    placeholder="Receiver Name"
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  />
                  <select
                    {...register("receiverRegion")}
                    defaultValue="Pick a region"
                    className="select h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  >
                    <option disabled>Pick a region</option>
                    {uniqueRegions.map((region, i) => (
                      <option key={i} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("receiverDistrict")}
                    defaultValue="Pick a district"
                    className="select h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  >
                    <option disabled>Pick a district</option>
                    {getDistrictsByRegion(receiverRegion).map((district, i) => (
                      <option key={i} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  <input
                    {...register("receiverAddress", { required: true })}
                    placeholder="Receiver Address"
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  />
                  <input
                    {...register("receiverContact", { required: true })}
                    placeholder="Receiver Contact No"
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  />
                  <textarea
                    {...register("deliveryInstruction")}
                    placeholder="Delivery Instruction"
                    className="textarea min-h-24 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  />
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-5 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-sm font-bold text-amber-300">
                  Pickup window
                </p>
                <p className="mt-1 text-sm text-slate-300">Approx. 4pm–7pm</p>
              </div>
              <button
                type="submit"
                className="btn h-12 rounded-xl border-0 bg-teal-600 px-6 font-extrabold text-white hover:bg-teal-500"
              >
                Proceed to Confirm Booking <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendParcel;
