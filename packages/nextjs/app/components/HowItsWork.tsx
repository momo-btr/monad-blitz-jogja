export default function HowItWorks() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-24">
      <div className="grid grid-cols-12 gap-16 items-center">
        <div className="col-span-12 lg:col-span-5">
          <div className="mb-10">
            <h2 className="font-display text-4xl font-bold text-on-surface mb-6 tracking-tight text-black">
              A Transparent Path to <br /> Digital Land Ownership
            </h2>
            <p className="font-body text-body-md text-outline leading-relaxed text-black/80">
              TerraChain menjembatani hukum pertanahan fisik dengan efisiensi blockchain. Protokol kami memastikan
              setiap token merepresentasikan hak hukum yang sah atas properti nyata.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 p-4 rounded-lg bg-surface-container-lowest shadow-ambient border border-emerald-100">
              <span className="font-display text-xl font-bold text-emerald-600">01</span>
              <div>
                <h4 className="font-display text-lg font-bold text-on-surface mb-1 text-emerald-600">Legal Validation</h4>
                <p className="font-body text-sm text-outline text-black">
                  Setiap parsel melalui proses verifikasi 3 tahap dengan pendaftaran tanah lokal.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-4 rounded-lg bg-surface-container-lowest shadow-ambient border border-emerald-100">
              <span className="font-display text-xl font-bold text-emerald-600">02</span>
              <div>
                <h4 className="font-display text-lg font-bold text-on-surface mb-1 text-emerald-600">Asset Tokenization</h4>
                <p className="font-body text-sm text-outline text-black">
                  Properti dibungkus ke dalam Legal SPV dan dicetak sebagai fractional NFTs.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-4 rounded-lg bg-surface-container-lowest shadow-ambient border border-emerald-100">
              <span className="font-display text-xl font-bold text-emerald-600">03</span>
              <div>
                <h4 className="font-display text-lg font-bold text-on-surface mb-1 text-emerald-600">Instant Settlement</h4>
                <p className="font-body text-sm text-outline text-black">
                  Smart contracts menangani escrow dan transfer kepemilikan secara instan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white border border-outline-variant rounded-xl shadow-ambient overflow-hidden">
            <div className="bg-forest-green p-6 text-black">
              <h3 className="font-display text-xl font-bold">On-Chain Asset Certificate</h3>
              <p className="font-body text-xs opacity-80 uppercase tracking-widest mt-1">Immutable Ledger Record #TC-882</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <label className="font-body text-[10px] font-bold text-outline uppercase tracking-wider block mb-2 text-black">
                    Smart Contract
                  </label>
                  <p className="font-display font-medium text-on-surface break-all text-sm text-black">0x71C...8e42f</p>
                </div>
                <div>
                  <label className="font-body text-[10px] font-bold text-outline uppercase tracking-wider block mb-2 text-black">
                    Legal Jurisdiction
                  </label>
                  <p className="font-display font-medium text-on-surface text-sm text-black">Indonesia, DIY</p>
                </div>
                <div className="col-span-2 h-[1px] bg-outline-variant/30" />
                <div>
                  <label className="font-body text-[10px] font-bold text-outline uppercase tracking-wider block mb-2 text-black">
                    Asset Type
                  </label>
                  <p className="font-display font-medium text-on-surface text-sm text-black">Agricultural / Commercial</p>
                </div>
                <div>
                  <label className="font-body text-[10px] font-bold text-outline uppercase tracking-wider block mb-2 text-black">
                    Total Supply
                  </label>
                  <p className="font-display font-medium text-on-surface text-sm text-black">1,000 Fractions</p>
                </div>
              </div>

              <div className="mt-12 p-4 bg-emerald-50 rounded-base border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                  <span className="font-body text-sm font-bold text-emerald-900">Verified by TerraChain Protocol</span>
                </div>
                <button className="text-emerald-600 font-display font-bold text-xs hover:underline" type="button">
                  VIEW ON EXPLORER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
