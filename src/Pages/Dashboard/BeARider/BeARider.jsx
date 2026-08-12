import { useForm, useWatch } from "react-hook-form";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { FaMotorcycle, FaIdCard, FaArrowRight } from "react-icons/fa";

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
    <div className="min-h-screen bg-white py-10 sm:py-14 lg:py-16">
      <div className="pc-container">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 px-5 py-8 shadow-[0_20px_60px_rgba(15,23,42,.06)] sm:px-8 sm:py-10 lg:px-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-50 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-600">
              <FaMotorcycle className="text-xs" /> Rider network
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Turn every delivery into a{" "}
              <span className="text-teal-700">new opportunity.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Apply to join the ProCurier rider network and help customers move
              their parcels safely across Bangladesh.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="relative mx-auto mt-10 max-w-5xl"
          >
            <div className="grid gap-7 lg:grid-cols-2">
              <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                    <FaMotorcycle />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal-700">
                      Step 01
                    </p>
                    <h2 className="text-xl font-extrabold text-slate-950">
                      Rider details
                    </h2>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    {...register("name")}
                    defaultValue={user?.displayName}
                    readOnly
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                    placeholder="Rider Name"
                  />
                  <input
                    type="text"
                    {...register("email")}
                    defaultValue={user?.email}
                    readOnly
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                    placeholder="Email"
                  />
                  <div className="relative">
                    <select
                      {...register("region")}
                      defaultValue="Pick a region"
                      className="select h-12 w-full  rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                    >
                      <option disabled>Pick a region</option>
                      {regions.map((region, i) => (
                        <option key={i} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    {...register("district")}
                    defaultValue="Pick a district"
                    className="select h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                  >
                    <option disabled>Pick a district</option>
                    {districtsByRegion(riderRegion)?.map((district, i) => (
                      <option key={i} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    {...register("address")}
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                    placeholder="Your Address"
                  />
                </div>
              </section>

              <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-600">
                    <FaIdCard />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-amber-600">
                      Step 02
                    </p>
                    <h2 className="text-xl font-extrabold text-slate-950">
                      More details
                    </h2>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    {...register("license")}
                    className="input h-12 w-full rounded-xlborder-slate-200 bg-slate-100 text-slate-800"
                    placeholder="Driving License"
                  />
                  <input
                    type="text"
                    {...register("nid")}
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                    placeholder="NID"
                  />
                  <input
                    type="text"
                    {...register("phoneNumber")}
                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                    placeholder="Phone Number"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      {...register("age")}
                      className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                      placeholder="Age"
                    />
                    <input
                      type="text"
                      {...register("bike")}
                      className="input h-12 w-full rounded-xl border-slate-200 bg-slate-100 text-slate-800"
                      placeholder="Bike"
                    />
                  </div>
                </div>
              </section>
            </div>
            <div className="mt-7 flex flex-col gap-5 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-sm font-bold text-amber-300">
                  Ready to ride?
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Submit your rider application to ProCurier.
                </p>
              </div>
              <button
                type="submit"
                className="btn h-12 rounded-xl border-0 bg-teal-600 px-7 font-extrabold text-white hover:bg-teal-500"
              >
                Apply as a Rider <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
