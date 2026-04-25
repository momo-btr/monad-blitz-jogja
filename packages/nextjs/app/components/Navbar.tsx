import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-slate-900">Terraforma</h1>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
          <Link href="/" className="text-emerald-600">
            Home
          </Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="#">How It Works</Link>
          <Link href="#">Governance</Link>
          <Link href="#">Resources</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2" type="button" aria-label="Select language">
          EN
        </button>
        <button className="bg-[#065F46] text-white px-5 py-2.5 rounded-md text-sm font-semibold" type="button">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
