import { MapExplorer } from "~~/components/MapExplorer";
import {
  ArrowTrendingUpIcon, ArrowTrendingDownIcon,
  BanknotesIcon,
  DocumentCheckIcon,
  CubeIcon,
  BuildingOfficeIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  // Mock GeoJSON for the dashboard map overview (multiple locations)
  const mockGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Sumatra Palm Estate" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [104.7566, -3.105],
              [104.7600, -3.105],
              [104.7600, -3.102],
              [104.7566, -3.102],
              [104.7566, -3.105],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { name: "Java Teak Forest" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [110.3705, -7.7956],
              [110.3755, -7.7956],
              [110.3755, -7.7906],
              [110.3705, -7.7906],
              [110.3705, -7.7956],
            ],
          ],
        },
      },
    ],
  };

  const metrics = [
    { title: "Total Portfolio Value", value: "1,250 MONAD", change: "+5.2%", isPositive: true },
    { title: "Active Assets", value: "14", change: "+2", isPositive: true },
    { title: "Est. Annual Yield", value: "8.4%", change: "+0.3%", isPositive: true },
    { title: "Pending Contracts", value: "3", change: "Action needed", isPositive: false, isNeutral: true },
  ];

  const transactions = [
    { id: "TX-901", asset: "Sumatra Palm Estate", type: "Acquisition", amount: "450 MONAD", date: "Today, 10:42 AM", status: "Completed", icon: GlobeEuropeAfricaIcon },
    { id: "TX-902", asset: "Bali Eco-Tourism", type: "Yield Distribution", amount: "12.5 MONAD", date: "Yesterday", status: "Completed", icon: BuildingOfficeIcon },
    { id: "TX-903", asset: "Java Teak Forest", type: "Escrow Deposit", amount: "100 MONAD", date: "Oct 14, 2023", status: "Pending", icon: CubeIcon },
  ];

  const allocations = [
    { label: "Agricultural", value: 45, color: "bg-primary" },
    { label: "Commercial", value: 30, color: "bg-blue-500" },
    { label: "Conservation", value: 25, color: "bg-amber-400" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content mb-2">Investment Overview</h1>
        <p className="text-base-content/70">Welcome back. Here is the latest summary of your tokenized real estate assets.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300 flex flex-col hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-base-content/60 mb-2">{metric.title}</span>
            <span className="text-3xl font-bold text-base-content mb-3">{metric.value}</span>
            <div className={`flex items-center text-sm font-medium ${metric.isNeutral ? 'text-warning' : metric.isPositive ? 'text-success' : 'text-error'}`}>
              {!metric.isNeutral && (
                metric.isPositive ? <ArrowTrendingUpIcon className="w-4 h-4 mr-1" /> : <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Spans 2) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Interactive Explorer */}
          <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-base-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-base-content">Interactive Explorer</h2>
              <button className="btn btn-sm btn-ghost text-primary">View Full Map</button>
            </div>
            <div className="p-0">
              <MapExplorer geoJsonData={mockGeoJson} />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
            <div className="p-5 border-b border-base-200">
              <h2 className="text-lg font-bold text-base-content">Recent On-Chain Activity</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200/50 text-base-content/70">
                  <tr>
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-0">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center text-primary">
                            <tx.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-semibold text-base-content">{tx.asset}</div>
                            <div className="text-xs text-base-content/50">{tx.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-base-content/80">{tx.type}</td>
                      <td className="font-medium text-base-content">{tx.amount}</td>
                      <td className="text-sm text-base-content/70">{tx.date}</td>
                      <td>
                        <span className={`badge badge-sm border-none ${tx.status === 'Completed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (Spans 1) */}
        <div className="space-y-8">

          {/* Asset Allocation */}
          <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
            <h2 className="text-lg font-bold text-base-content mb-6">Asset Allocation</h2>

            {/* Progress Bar Chart */}
            <div className="w-full h-4 rounded-full flex overflow-hidden mb-6">
              {allocations.map((alloc, idx) => (
                <div key={idx} className={`h-full ${alloc.color}`} style={{ width: `${alloc.value}%` }}></div>
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {allocations.map((alloc, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${alloc.color}`}></div>
                    <span className="text-sm font-medium text-base-content/80">{alloc.label}</span>
                  </div>
                  <span className="text-sm font-bold text-base-content">{alloc.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Insight Card */}
          <div className="bg-gradient-to-br from-primary to-[#207a6f] p-6 rounded-xl shadow-sm text-primary-content relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <DocumentCheckIcon className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-primary-content/90 tracking-wide uppercase">Insight</span>
              </div>
              <h3 className="text-xl font-bold mb-2">High Yield Opportunity</h3>
              <p className="text-primary-content/80 text-sm mb-6 leading-relaxed">
                Based on your portfolio's heavy agricultural weighting, adding commercial land in the Java region could optimize your yield curve by an estimated 1.2% APY.
              </p>
              <button className="btn btn-sm bg-white text-primary hover:bg-base-200 border-none w-full">
                Explore Commercial Assets
              </button>
            </div>
            {/* Decorative background element */}
            <BanknotesIcon className="w-48 h-48 absolute -bottom-10 -right-10 text-white opacity-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}
