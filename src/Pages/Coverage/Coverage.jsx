import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
  // console.log(serviceCenters);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      console.log(district, coord);
      // go to the location
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <main className="bg-slate-50 py-10 sm:py-14">
      <div className="pc-container">
        <div className="mb-7 max-w-2xl">
          <span className="pc-kicker">Nationwide network</span>
          <h2 className="pc-title mt-4 text-3xl sm:text-4xl">
            Delivery coverage across 64 districts
          </h2>
          <p className="pc-muted mt-3 leading-7">
            Search your district and explore our service-center coverage on the
            live map.
          </p>
        </div>
        <div className="pc-card overflow-hidden p-4 sm:p-6">
          <h2 className="sr-only">We are available in 64 districts</h2>
          <div>
            <form
              className="flex flex-col gap-3 pb-5 sm:flex-row"
              onSubmit={handleSearch}
            >
              <label className="input pc-input h-12 w-full sm:max-w-md">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  className="grow"
                  name="location"
                  placeholder="Search"
                />
              </label>
              <button
                type="submit"
                className="btn h-12 rounded-xl border-0 bg-teal-700 px-6 text-white hover:bg-teal-800"
              >
                Search
              </button>
            </form>
          </div>
          {/*  */}
          <div className="h-[520px] overflow-hidden rounded-2xl border border-slate-200 sm:h-[650px]">
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              className="h-full"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {serviceCenters.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <strong>{center.district}</strong> <br /> Service Area:{" "}
                    {center.covered_area.join(", ")}.
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Coverage;
