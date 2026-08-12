const Service = ({ service }) => {
  const Icon = service.icon;
  const amber = service.accent === "amber";

  return (
    <article className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,.06)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_24px_60px_rgba(15,23,42,.12)]">
      <div
        className={`absolute -right-7 -top-7 h-28 w-28 rounded-full transition-transform duration-500 group-hover:scale-125 ${
          amber ? "bg-amber-50" : "bg-teal-50"
        }`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`grid h-14 w-14 place-items-center rounded-2xl text-xl transition-all duration-300 group-hover:scale-105 ${
            amber
              ? "bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-slate-950"
              : "bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white"
          }`}
        >
          <Icon />
        </div>

        <span className="font-mono text-sm font-bold tracking-wider text-slate-300">
          {service.number}
        </span>
      </div>

      <div className="relative mt-7">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {service.description}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-7 text-xs font-bold uppercase tracking-wider text-slate-400">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            amber ? "bg-amber-400" : "bg-teal-600"
          }`}
        />
        Reliable delivery
      </div>
    </article>
  );
};

export default Service;
