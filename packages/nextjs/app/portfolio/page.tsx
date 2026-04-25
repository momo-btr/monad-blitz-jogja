import Link from "next/link";
import {
  ArrowTrendingUpIcon,
  ArrowDownRightIcon,
  DocumentTextIcon,
  CubeIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Portfolio() {
  const metrics = [
    { title: "Portfolio Value", value: "1,250 MONAD", change: "+5.2%", isPositive: true },
    { title: "Est. Annual Yield", value: "8.4%", change: "+0.3%", isPositive: true },
    { title: "Total Area (Acres)", value: "165", change: "0%", isNeutral: true },
    { title: "Active Assets", value: "2", change: "+1", isPositive: true },
  ];

  const ownedProperties = [
    {
      id: "ID-1042",
      name: "Sumatra Palm Estate",
      purchasePrice: "450 MONAD",
      currentValue: "480 MONAD",
      yield: "9.2%",
      status: "Verified",
      image: "https://placehold.co/600x400/2A9D8F/FFFFFF?text=Sumatra+Palm",
    },
    {
      id: "ID-2088",
      name: "Bali Eco-Tourism Hub",
      purchasePrice: "800 MONAD",
      currentValue: "770 MONAD",
      yield: "7.8%",
      status: "In Escrow",
      image: "https://placehold.co/600x400/264653/FFFFFF?text=Bali+Eco",
    },
  ];

  const ledgerActivity = [
    { txHash: "0x8f...3b1a", event: "Yield Distribution", asset: "Sumatra Palm Estate", amount: "+4.5 MONAD", date: "Oct 24, 2023", status: "Success" },
    { txHash: "0x2a...9c4d", event: "Escrow Deposit", asset: "Bali Eco-Tourism Hub", amount: "-100 MONAD", date: "Oct 18, 2023", status: "Success" },
    { txHash: "0x5e...1f8b", event: "Asset Acquisition", asset: "Sumatra Palm Estate", amount: "-450 MONAD", date: "Sep 02, 2023", status: "Success" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Investor Portfolio</h1>
        <p className="text-black/70">Manage your holdings, track performance, and view on-chain ledger history.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-base-300 flex flex-col">
            <span className="text-sm font-medium text-black/60 mb-2">{metric.title}</span>
            <span className="text-3xl font-bold text-black mb-3">{metric.value}</span>
            <div className={`flex items-center text-sm font-medium ${metric.isNeutral ? 'text-black/50' : metric.isPositive ? 'text-success' : 'text-error'}`}>
              {!metric.isNeutral && (
                metric.isPositive ? <ArrowTrendingUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownRightIcon className="w-4 h-4 mr-1" />
              )}
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart (Mock) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-base-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-black">Historical Performance</h2>
          <select className="select select-sm select-bordered bg-white text-black">
            <option>1M</option>
            <option>3M</option>
            <option selected>YTD</option>
            <option>1Y</option>
            <option>ALL</option>
          </select>
        </div>
        <div className="h-64 w-full rounded-lg bg-base-200/30 border border-base-200 flex items-end relative overflow-hidden p-4">
          {/* Mock SVG Line Chart */}
          <svg className="w-full h-full text-primary opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path
              d="M0,90 Q10,85 20,70 T40,60 T60,40 T80,30 T100,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M0,90 Q10,85 20,70 T40,60 T60,40 T80,30 T100,10 L100,100 L0,100 Z"
              fill="currentColor"
              className="opacity-10"
            />
          </svg>
          <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-base-200 text-sm font-bold text-black">
            +5.2% YTD
          </div>
        </div>
      </div>

      {/* Owned Assets Grid */}
      <div>
        <h2 className="text-xl font-bold text-black mb-6">My Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ownedProperties.map((prop, idx) => (
            <div key={idx} className="card bg-white shadow-sm border border-base-300 flex flex-row overflow-hidden h-48 hover:shadow-md transition-shadow">
              <figure className="w-2/5 h-full relative">
                <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 badge badge-sm bg-white/90 border-none text-black font-mono text-xs font-bold shadow-sm">
                  {prop.id}
                </div>
              </figure>
              <div className="card-body p-5 w-3/5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="card-title text-lg text-black leading-tight">{prop.name}</h3>
                </div>

                <div className="mb-auto">
                   <span className={`badge badge-sm border-none shadow-sm ${prop.status === 'Verified' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                    {prop.status === 'Verified' ? <CheckCircleIcon className="w-3 h-3 mr-1"/> : <ClockIcon className="w-3 h-3 mr-1"/>}
                    {prop.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm mt-4">
                  <div>
                    <p className="text-black/50 text-xs font-medium">Current Value</p>
                    <p className="font-bold text-black">{prop.currentValue}</p>
                  </div>
                  <div>
                    <p className="text-black/50 text-xs font-medium">Est. Yield</p>
                    <p className="font-bold text-success">{prop.yield}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* On-Chain Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-base-300 overflow-hidden">
        <div className="p-6 border-b border-base-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-black flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-primary" />
            Recent On-Chain Activity
          </h2>
          <button className="btn btn-sm btn-outline border-base-300 text-black/70 hover:bg-base-200 hover:border-base-300">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200/50 text-black/70">
              <tr>
                <th>Event / TX Hash</th>
                <th>Asset</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ledgerActivity.map((tx, idx) => (
                <tr key={idx} className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-0">
                  <td>
                    <div className="font-semibold text-black">{tx.event}</div>
                    <Link href={`https://explorer.monad-testnet.io/tx/${tx.txHash}`} target="_blank" className="text-xs text-primary hover:underline font-mono">
                      {tx.txHash}
                    </Link>
                  </td>
                  <td className="text-black/80 flex items-center gap-2 mt-2">
                    <CubeIcon className="w-4 h-4 text-black/50" />
                    {tx.asset}
                  </td>
                  <td className={`font-medium ${tx.amount.startsWith('+') ? 'text-success' : 'text-black'}`}>
                    {tx.amount}
                  </td>
                  <td className="text-sm text-black/70">{tx.date}</td>
                  <td>
                     <span className="badge badge-sm badge-outline border-success text-success bg-success/5 font-medium">
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
  );
}
