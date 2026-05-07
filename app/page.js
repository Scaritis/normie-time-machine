"use client";

import { useState } from "react";

function shortenAddress(address) {
  if (!address) return "Unknown";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export default function Home() {

  const [normieId, setNormieId] = useState("");
  const [versions, setVersions] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function fetchNormie() {

    if (!normieId) return;

    setLoading(true);
    setSearched(true);

    try {

      const historyResponse = await fetch(
        "https://api.normies.art/history/normie/" +
          normieId +
          "/versions"
      );

      const historyResult = await historyResponse.json();

      setVersions(historyResult || []);

      const marketResponse = await fetch(
        "/api/market?id=" + normieId
      );

      const marketResult = await marketResponse.json();

      setMarketData(marketResult || {});

    } catch (error) {

      console.error(error);

      alert("Failed to fetch");

    }

    setLoading(false);

  }

  const fallbackData = {
    "7740": {
      owner: "EdMcKenway",
      listed: true,
      price: 5.2,
    },
  };

  const fallback = fallbackData[normieId];

  const owner =
    marketData?.owner ||
    fallback?.owner ||
    "Unknown";

  const currentListing =
    marketData?.currentPrice ||
    fallback?.price ||
    null;

  const isListed =
    marketData?.listed ??
    fallback?.listed ??
    false;

  return (

    <main className="relative min-h-screen overflow-hidden bg-[#07090d] text-[#f5f1e8]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[160px] rounded-full"></div>

      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 px-6 py-20">

        {/* HERO */}
        <div className="text-center">

          <div className="uppercase tracking-[0.5em] text-cyan-300 text-sm mb-6">
            ONCHAIN EVOLUTION ENGINE
          </div>

          <h1
            className="text-6xl md:text-8xl font-black uppercase leading-[0.9]"
            style={{
              textShadow: "0 0 40px rgba(34,211,238,0.25)",
            }}
          >
            Normies
            <br />
            Time Machine
          </h1>

          <div className="mt-6 text-zinc-400 uppercase tracking-[0.3em] text-sm">
            Explore Every Onchain Customization
          </div>

          {/* SEARCH */}
          <div className="mt-14 flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto bg-black/40 border border-cyan-400/20 backdrop-blur-xl rounded-[28px] p-4">

            <input
              value={normieId}
              onChange={(e) => setNormieId(e.target.value)}
              placeholder="ENTER NORMIE ID"
              className="flex-1 bg-[#111111] border border-cyan-400/20 rounded-2xl px-6 py-5 text-lg uppercase tracking-widest outline-none focus:border-cyan-300"
            />

            <button
              onClick={fetchNormie}
              className="bg-cyan-300 text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all duration-300"
            >
              {loading ? "SCANNING..." : "SCAN TIMELINE"}
            </button>

          </div>

        </div>

        {/* MARKET */}
        {searched && (

          <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">

            {/* OWNER */}
            <div className="rounded-[28px] border border-cyan-400/20 bg-black/50 backdrop-blur-xl p-8">

              <div className="text-cyan-300 uppercase tracking-[0.25em] text-xs">
                Current Owner
              </div>

              <div className="mt-5 text-3xl font-black break-all">

                {owner.includes("0x")
                  ? shortenAddress(owner)
                  : owner}

              </div>

            </div>

            {/* STATUS */}
            <div
              className={
                "rounded-[28px] border bg-black/50 backdrop-blur-xl p-8 " +
                (
                  isListed
                    ? "border-green-400/20"
                    : "border-red-500/20"
                )
              }
            >

              <div className="text-cyan-300 uppercase tracking-[0.25em] text-xs">
                Market Status
              </div>

              <div className="mt-5 text-3xl font-black">

                {isListed
                  ? "LIVE ON OPENSEA"
                  : "NOT LISTED"}

              </div>

            </div>

            {/* PRICE */}
            <div className="rounded-[28px] border border-fuchsia-500/20 bg-black/50 backdrop-blur-xl p-8">

              <div className="text-fuchsia-300 uppercase tracking-[0.25em] text-xs">
                Current Price
              </div>

              <div className="mt-5 text-3xl font-black">

                {isListed
                  ? currentListing + " ETH"
                  : "NOT LISTED"}

              </div>

            </div>

          </div>

        )}

        {/* ORIGINAL STATE */}
        {searched && versions.length === 0 && (

          <div className="mt-24 max-w-5xl mx-auto">

            <div className="rounded-[32px] border border-red-500/20 bg-black/60 backdrop-blur-xl p-10">

              <div className="grid md:grid-cols-2 gap-10 items-center">

                <div className="border border-red-500/20 bg-[#0d1117] rounded-[28px] p-10 flex items-center justify-center h-[420px]">

                  <img
                    src={
                      "https://api.normies.art/normie/" +
                      normieId +
                      "/image.png"
                    }
                    alt="Normie"
                    className="w-full h-full object-contain"
                    style={{
                      imageRendering: "pixelated",
                    }}
                  />

                </div>

                <div>

                  <div className="uppercase tracking-[0.4em] text-red-400 text-sm mb-5">
                    Customization Scan Result
                  </div>

                  <h2 className="text-6xl font-black mb-6">
                    ORIGINAL STATE
                  </h2>

                  <div className="text-zinc-400 text-lg leading-relaxed">

                    No customization history detected.

                    <br />
                    <br />

                    This Normie remains in its original onchain form.

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* TIMELINE */}
        <div className="mt-24 max-w-7xl mx-auto">

          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8">

            {versions.map((version, index) => {

              return (

                <div
                  key={index}
                  className="relative border border-cyan-400/20 bg-black/60 backdrop-blur-xl p-6 rounded-[30px] overflow-hidden hover:border-cyan-300/40 hover:-translate-y-1 transition-all duration-300"
                >

                  {/* IMAGE */}
                  <div className="border border-cyan-400/20 bg-[#0d1117] rounded-[24px] p-6 flex items-center justify-center h-[340px]">

                    <img
                      src={
                        "https://api.normies.art/history/normie/" +
                        normieId +
                        "/version/" +
                        version.version +
                        "/image.png"
                      }
                      alt={"Version " + version.version}
                      className="w-full h-full object-contain hover:scale-105 transition-all duration-500"
                      style={{
                        imageRendering: "pixelated",
                      }}
                    />

                  </div>

                  {/* INFO */}
                  <div className="mt-6">

                    <div className="uppercase tracking-[0.3em] text-cyan-300 text-xs mb-3">
                      Evolution Phase
                    </div>

                    <h2 className="text-5xl font-black mb-6">
                      V{version.version}
                    </h2>

                    <div className="space-y-4 text-sm uppercase tracking-[0.15em]">

                      <div className="flex justify-between border-b border-cyan-400/10 pb-3">

                        <span className="text-zinc-500">
                          Pixel Changes
                        </span>

                        <span>
                          {version.changeCount}
                        </span>

                      </div>

                      <div className="flex justify-between border-b border-cyan-400/10 pb-3">

                        <span className="text-zinc-500">
                          Pixels Added
                        </span>

                        <span>
                          {version.newPixelCount}
                        </span>

                      </div>

                      <div className="flex justify-between border-b border-cyan-400/10 pb-3 gap-4">

                        <span className="text-zinc-500">
                          Transformer
                        </span>

                        <span>
                          {shortenAddress(version.transformer)}
                        </span>

                      </div>

                    </div>

                    {/* LINKS */}
                    <div className="mt-8 flex gap-4">

                      <a
                        href={
                          "https://etherscan.io/tx/" +
                          version.txHash
                        }
                        target="_blank"
                        className="flex-1 text-center border border-cyan-400/20 px-5 py-3 rounded-2xl hover:bg-cyan-300 hover:text-black transition-all"
                      >
                        Transaction
                      </a>

                      <a
                        href={
                          "https://opensea.io/item/ethereum/0x9eb6e2025b64f340691e424b7fe7022ffde12438/" +
                          normieId
                        }
                        target="_blank"
                        className="flex-1 text-center border border-fuchsia-500/20 px-5 py-3 rounded-2xl hover:bg-fuchsia-500 hover:text-white transition-all"
                      >
                        OpenSea
                      </a>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </main>

  );

}