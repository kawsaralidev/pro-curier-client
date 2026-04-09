import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import UseTrackingLogger from "../../hooks/useTrackingLogger";

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
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Add Parcel</h2>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="font-semibold mb-4">Enter your parcel details</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* parcel type*/}
            <div>
              <label className="label mr-4">
                <input
                  type="radio"
                  {...register("type", { required: true })}
                  value="document"
                  className="radio"
                  defaultChecked
                />
                Document
              </label>
              <label className="label">
                <input
                  type="radio"
                  {...register("type", { required: true })}
                  value="non-document"
                  className="radio"
                />
                Non-Document
              </label>
            </div>
            {errors.type && <p className="text-red-500">Type is Required</p>}

            {/* parcel info: name, weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
              <fieldset className="fieldset">
                <label className=" font-semibold">Parcel Name</label>
                <input
                  type="text"
                  {...register("parcelName")}
                  className="input w-full"
                  placeholder="Parcel Name"
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="font-semibold">Parcel Weight (kg)</label>
                <input
                  type="number"
                  step=""
                  {...register("parcelWeight")}
                  disabled={parcelType !== "non-document"}
                  className={`input input-border w-full ${
                    parcelType !== "non-document"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Parcel Weight"
                />
              </fieldset>
            </div>

            {/* Sender & Receiver */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender */}
              <div className="space-y-3">
                <h4 className="font-semibold">Sender Details</h4>

                <input
                  type="text"
                  {...register("senderName")}
                  defaultValue={user?.displayName}
                  className="input w-full"
                  placeholder="Sender Name"
                />

                {/* sender email */}
                <input
                  type="text"
                  {...register("senderEmail")}
                  defaultValue={user?.email}
                  className="input w-full"
                  placeholder="Sender Email"
                />
                {/* sender region */}
                <select
                  {...register("senderRegion")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>

                {/* sender districts */}

                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {getDistrictsByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <input
                  {...register("senderAddress", { required: true })}
                  placeholder="Address"
                  className="input input-bordered w-full"
                />

                <input
                  {...register("senderContact", { required: true })}
                  placeholder="Sender Contact No"
                  className="input input-bordered w-full"
                />

                <textarea
                  {...register("pickupInstruction")}
                  placeholder="Pickup Instruction"
                  className="textarea textarea-bordered w-full"
                />
              </div>

              {/* Receiver */}
              <div className="space-y-3">
                <h4 className="font-semibold">Receiver Details</h4>

                <input
                  {...register("receiverName", { required: true })}
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                />

                {/* receiver region */}
                <fieldset className="fieldset">
                  <select
                    {...register("receiverRegion")}
                    defaultValue="Pick a region"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a region</option>
                    {uniqueRegions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* receiver district */}
                <fieldset className="fieldset">
                  <select
                    {...register("receiverDistrict")}
                    defaultValue="Pick a district"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a district</option>
                    {getDistrictsByRegion(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <input
                  {...register("receiverAddress", { required: true })}
                  placeholder="Address"
                  className="input input-bordered w-full"
                />

                <input
                  {...register("receiverContact", { required: true })}
                  placeholder="Receiver Contact No"
                  className="input input-bordered w-full"
                />

                <textarea
                  {...register("deliveryInstruction")}
                  placeholder="Delivery Instruction"
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                * Pickup Time 4pm–7pm Approx.
              </p>

              <button type="submit" className="btn btn-success">
                Proceed to Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    // <div>
    //   <h2 className="text-5xl font-bold">Send A Parcel</h2>
    //   <form onSubmit={handleSubmit(onSubmit)} className="mt-12 p-4 text-black">
    //     {/* parcel type*/}
    //     <div>
    //       <label className="label mr-4">
    //         <input
    //           type="radio"
    //           {...register("parcelType")}
    //           value="document"
    //           className="radio"
    //           defaultChecked
    //         />
    //         Document
    //       </label>
    //       <label className="label">
    //         <input
    //           type="radio"
    //           {...register("parcelType")}
    //           value="non-document"
    //           className="radio"
    //         />
    //         Non-Document
    //       </label>
    //     </div>

    //     {/* parcel info: name, weight */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
    //       <fieldset className="fieldset">
    //         <label className="label">Parcel Name</label>
    //         <input
    //           type="text"
    //           {...register("parcelName")}
    //           className="input w-full"
    //           placeholder="Parcel Name"
    //         />
    //       </fieldset>
    //       <fieldset className="fieldset">
    //         <label className="label">Parcel Weight (kg)</label>
    //         <input
    //           type="number"
    //           {...register("parcelWeight")}
    //           className="input w-full"
    //           placeholder="Parcel Weight"
    //         />
    //       </fieldset>
    //     </div>

    //     {/* two column */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    //       {/* sender Details */}

    //       <fieldset className="fieldset">
    //         <h4 className="text-2xl font-semibold">Sender Details</h4>
    //         {/* sender name */}
    //         <label className="label">Sender Name</label>
    //         <input
    //           type="text"
    //           {...register("senderName")}
    //           defaultValue={user?.displayName}
    //           className="input w-full"
    //           placeholder="Sender Name"
    //         />

    //         {/* sender email */}
    //         <label className="label">Sender Email</label>
    //         <input
    //           type="text"
    //           {...register("senderEmail")}
    //           defaultValue={user?.email}
    //           className="input w-full"
    //           placeholder="Sender Email"
    //         />

    //         {/* sender region */}
    //         <fieldset className="fieldset">
    //           <legend className="fieldset-legend">Sender Regions</legend>
    //           <select
    //             {...register("senderRegion")}
    //             defaultValue="Pick a region"
    //             className="select"
    //           >
    //             <option disabled={true}>Pick a region</option>
    //             {uniqueRegions.map((r, i) => (
    //               <option key={i} value={r}>
    //                 {r}
    //               </option>
    //             ))}
    //           </select>
    //         </fieldset>

    //         {/* sender districts */}
    //         <fieldset className="fieldset">
    //           <legend className="fieldset-legend">Sender Districts</legend>
    //           <select
    //             {...register("senderDistrict")}
    //             defaultValue="Pick a district"
    //             className="select"
    //           >
    //             <option disabled={true}>Pick a district</option>
    //             {getDistrictsByRegion(senderRegion).map((r, i) => (
    //               <option key={i} value={r}>
    //                 {r}
    //               </option>
    //             ))}
    //           </select>
    //         </fieldset>

    //         {/* sender address */}
    //         <label className="label mt-4">Sender Address</label>
    //         <input
    //           type="text"
    //           {...register("senderAddress")}
    //           className="input w-full"
    //           placeholder="Sender Address"
    //         />
    //       </fieldset>
    //       {/* receiver Details */}
    //       <fieldset className="fieldset">
    //         <h4 className="text-2xl font-semibold">Receiver Details</h4>
    //         {/* receiver name */}
    //         <label className="label">Receiver Name</label>
    //         <input
    //           type="text"
    //           {...register("receiverName")}
    //           className="input w-full"
    //           placeholder="Receiver Name"
    //         />

    //         {/* receiver email */}
    //         <label className="label">Receiver Email</label>
    //         <input
    //           type="text"
    //           {...register("receiverEmail")}
    //           className="input w-full"
    //           placeholder="Receiver Email"
    //         />

    //         {/* receiver region */}
    //         <fieldset className="fieldset">
    //           <legend className="fieldset-legend">Receiver Regions</legend>
    //           <select
    //             {...register("receiverRegion")}
    //             defaultValue="Pick a region"
    //             className="select"
    //           >
    //             <option disabled={true}>Pick a region</option>
    //             {uniqueRegions.map((r, i) => (
    //               <option key={i} value={r}>
    //                 {r}
    //               </option>
    //             ))}
    //           </select>
    //         </fieldset>

    //         {/* receiver district */}
    //         <fieldset className="fieldset">
    //           <legend className="fieldset-legend">Receiver District</legend>
    //           <select
    //             {...register("receiverDistrict")}
    //             defaultValue="Pick a district"
    //             className="select"
    //           >
    //             <option disabled={true}>Pick a district</option>
    //             {getDistrictsByRegion(receiverRegion).map((d, i) => (
    //               <option key={i} value={d}>
    //                 {d}
    //               </option>
    //             ))}
    //           </select>
    //         </fieldset>

    //         {/* receiver address */}
    //         <label className="label mt-4">Receiver Address</label>
    //         <input
    //           type="text"
    //           {...register("receiverAddress")}
    //           className="input w-full"
    //           placeholder="Receiver Address"
    //         />
    //       </fieldset>
    //     </div>
    //     <input
    //       type="submit"
    //       className="btn btn-primary mt-8 text-black"
    //       value="Send Parcel"
    //     />
    //   </form>
    // </div>
  );
};

export default SendParcel;
