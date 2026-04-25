import Link from "next/link";

export default function Marketplace() {
  // Mock data for marketplace properties
  const mockProperties = [
    {
      id: 1,
      name: "Sumatra Palm Estate",
      price: "450 MONAD",
      acres: "120",
      use: "Agricultural",
      soil: "High Yield",
      carbon: "500t/yr",
      permit: "Yes",
      verified: true,
      image: "https://placehold.co/600x400/2A9D8F/FFFFFF?text=Sumatra+Palm+Estate",
    },
    {
      id: 2,
      name: "Bali Eco-Tourism Hub",
      price: "800 MONAD",
      acres: "45",
      use: "Commercial",
      soil: "Moderate",
      carbon: "120t/yr",
      permit: "Pending",
      verified: true,
      image: "https://placehold.co/600x400/264653/FFFFFF?text=Bali+Eco-Tourism",
    },
    {
      id: 3,
      name: "Java Teak Plantation",
      price: "600 MONAD",
      acres: "80",
      use: "Forestry",
      soil: "Premium",
      carbon: "850t/yr",
      permit: "Yes",
      verified: false,
      image: "https://placehold.co/600x400/E9C46A/FFFFFF?text=Java+Teak+Plantation",
    },
    {
      id: 4,
      name: "Kalimantan Conservation",
      price: "320 MONAD",
      acres: "200",
      use: "Conservation",
      soil: "Peatland",
      carbon: "2000t/yr",
      permit: "Restricted",
      verified: true,
      image: "https://placehold.co/600x400/2A9D8F/FFFFFF?text=Kalimantan+Conservation",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Top Metrics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Available Land Parcels</h1>
          <p className="text-black/70">Browse fully verified, on-chain real estate assets.</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-base-300 min-w-[150px]">
            <p className="text-sm text-black/60 font-medium mb-1">Floor Price</p>
            <p className="text-2xl font-bold text-black">320 <span className="text-sm font-normal text-black/60">MONAD</span></p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-base-300 min-w-[150px]">
            <p className="text-sm text-black/60 font-medium mb-1">Total Volume</p>
            <p className="text-2xl font-bold text-black">12.4k <span className="text-sm font-normal text-black/60">MONAD</span></p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-base-300 flex flex-wrap gap-4 items-center">
        <select className="select select-bordered bg-white text-black border-base-300 w-full md:w-auto min-w-[160px] focus:outline-primary">
          <option disabled selected>Region</option>
          <option>Sumatra</option>
          <option>Java</option>
          <option>Bali</option>
          <option>Kalimantan</option>
        </select>

        <input
          type="text"
          placeholder="Price Range (MONAD)"
          className="input input-bordered bg-white text-black border-base-300 w-full md:w-auto min-w-[200px] focus:outline-primary"
        />

        <div className="join w-full md:w-auto">
          <input className="join-item btn btn-active bg-primary border-primary text-black hover:bg-primary/90" type="radio" name="options" aria-label="All" defaultChecked />
          <input className="join-item btn bg-white border-base-300 text-black hover:bg-white" type="radio" name="options" aria-label="Agricultural" />
          <input className="join-item btn bg-white border-base-300 text-black hover:bg-white" type="radio" name="options" aria-label="Commercial" />
          <input className="join-item btn bg-white border-base-300 text-black hover:bg-white" type="radio" name="options" aria-label="Conservation" />
        </div>

        <button className="btn btn-ghost text-primary ml-auto">Clear Filters</button>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProperties.map((prop) => (
          <div key={prop.id} className="card bg-white shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow">
            <figure className="h-48 relative overflow-hidden">
              <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
              {prop.verified && (
                <div className="absolute top-3 right-3 badge badge-success bg-primary border-none text-white shadow-sm font-semibold text-xs py-2.5">
                  ✓ Verified
                </div>
              )}
            </figure>
            <div className="card-body p-5">
              <h2 className="card-title text-lg text-black line-clamp-1 mb-1">
                {prop.name}
              </h2>

              <div className="flex gap-2 mb-4">
                <span className="badge badge-outline border-base-300 text-black/70">{prop.acres} Acres</span>
                <span className="badge badge-outline border-base-300 text-black/70">{prop.use}</span>
              </div>

              {/* Tech Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs text-black/60 bg-white p-3 rounded-lg mb-4">
                <div className="flex flex-col">
                  <span className="font-semibold">Soil Quality</span>
                  <span>{prop.soil}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Carbon Offset</span>
                  <span>{prop.carbon}</span>
                </div>
                <div className="flex flex-col mt-1">
                  <span className="font-semibold">Bldg Permit</span>
                  <span>{prop.permit}</span>
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center pt-2 border-t border-base-200">
                <div>
                  <p className="text-xs text-black/60 font-medium">Price</p>
                  <span className="font-bold text-xl text-primary">{prop.price}</span>
                </div>
                <Link href={`/property/${prop.id}`} className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-black hover:border-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
