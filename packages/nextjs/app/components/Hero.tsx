import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-12 gap-12 items-center">
      <div className="col-span-12 lg:col-span-7">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] mb-6">
          <span className="text-[10px] font-bold tracking-widest uppercase">Regulated Land Protocol</span>
        </div>

        <h1 className="font-display text-6xl font-bold leading-[1.1] text-on-surface mb-6 tracking-[-0.02em] text-black">
          The Future of Land Ownership is <span className="text-emerald-600">On-Chain</span>
        </h1>

        <p className="font-body text-lg text-outline max-w-lg mb-10 leading-relaxed text-black/80">
          Unlock global real estate through fractional ownership. Secure, instant liquidity and immutable digital deeds
          powered by the TerraChain protocol.
        </p>

        <div className="flex gap-4">
          <button className="bg-emerald-600 hover:bg-forest-green text-black font-body font-bold px-8 py-4 transition-all flex items-center gap-2 rounded-md" type="button">
            Explore Marketplace
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4.166 10h11.667M10 4.166L15.833 10 10 15.833"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="border border-emerald-600 border-outline-variant hover:bg-surface-container-low text-outline font-body font-bold px-8 py-4 transition-all text-black rounded-md"
            type="button"
          >
            Whitepaper
          </button>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5 relative">
        <div className="rounded-xl overflow-hidden shadow-ambient border border-white/20">
          <Image
            src="/thumbnail.jpg"
            alt="Landscape"
            width={960}
            height={640}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-lg shadow-ambient border border-gray-100 w-72">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-base flex items-center justify-center text-black font-bold">
              LC
            </div>
            <div>
              <p className="font-body text-[10px] font-bold text-outline uppercase tracking-wider text-background">
                Fractional Asset
              </p>
              <p className="font-display font-bold text-on-surface text-emerald-600">Parcel ID: #882-TC</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-emerald-600 w-3/4" />
          </div>
          <div className="flex justify-between font-body text-[10px] font-bold text-outline">
            <span className="text-black">75% MINTED</span>
            <span className="text-emerald-600 underline cursor-pointer">DETAILS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
