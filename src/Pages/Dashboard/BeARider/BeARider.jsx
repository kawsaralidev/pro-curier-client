import { useForm, useWatch } from "react-hook-form";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const BeARider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }
  } = useForm();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach to you in 145 days",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-4xl text-center mt-7 text-error">Be a Rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4 text-black"
      >
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* rider Details */}

          <fieldset className="fieldset">
            <h4 className="text-2xl text-amber-50 font-semibold">
              Rider Details
            </h4>
            {/* rider name */}
            <label className="label text-orange-200">Rider Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Sender Name"
            />

            {/* rider email */}
            <label className="label text-orange-200">Email</label>
            <input
              type="text"
              {...register("email")}
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Sender Email"
            />

            {/* rider region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-orange-200">
                Regions
              </legend>
              <select
                {...register("region")}
                defaultValue="Pick a region"
                className="input input-bordered w-full bg-base-200 text-base-content"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* rider districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-orange-200">
                Districts
              </legend>
              <select
                {...register("district")}
                defaultValue="Pick a district"
                className="input input-bordered w-full bg-base-200 text-base-content"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(riderRegion)?.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* rider address */}
            <label className="label text-orange-200 mt-4">Your Address</label>
            <input
              type="text"
              {...register("address")}
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Sender Address"
            />
          </fieldset>
          {/* receiver Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl text-amber-50 font-semibold">
              More Details
            </h4>
            {/* receiver name */}
            <label className="label text-orange-200">Driving License</label>
            <input
              type="text"
              {...register("license")}
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Driving License"
            />

            {/* receiver email */}
            <label className="label text-orange-200 mt-1">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="NID"
            />
            <label className="label text-orange-200 mt-1">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Phone Number"
            />
            <label className="label text-orange-200 mt-4">Age</label>
            <input
              type="text"
              {...register("age")}
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Age"
            />

            {/* Bike */}
            <label className="label text-orange-200 mt-4">BIKE</label>
            <input
              type="text"
              {...register("bike")}
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Bike"
            />
            {/*  address */}
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-error mt-8 text-black"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default BeARider;
