
import layer1 from "../../../assets/logos/Layer_1.png";

const BeMerchant = () => (
  <section className="bg-slate-50 pb-20">
    <div className="pc-container">
      <div className="overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl">
        <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.05fr_.95fr] lg:p-14">
          <div className="text-white">
            <span className="inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">For businesses</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Move more parcels without losing control.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              ProCurier gives merchants a clear delivery workflow with parcel visibility,
              rider operations, and status tracking in one platform.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Nationwide coverage</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Live tracking</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Role-based dashboard</span>
            </div>
          </div>
          <div className="rounded-3xl bg-teal-700/30 p-4">
            <img src={layer1} alt="Merchant delivery operations" className="mx-auto max-h-80 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BeMerchant;
