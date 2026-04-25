const stats = [
  { label: "Total Land Managed", value: "$4.2B+" },
  { label: "Active Investors", value: "24k+" },
  { label: "Global Jurisdictions", value: "12" },
  { label: "Settlement Time", value: "0.5s" },
];

export default function Stats() {
  return (
    <div className="border-y border-gray-100 py-12 px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-emerald-50">
      {stats.map((stat, i) => (
        <div key={i}>
          <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
          <p className="text-sm text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
