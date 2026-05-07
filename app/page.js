"use client";

import { useState } from "react";

function shortenAddress(address) {
  if (!address) return "Unknown";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
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

      // HISTORY
      const historyResponse = await fetch(
        `https://api.normies.art/history/normie/${normieId}/versions`
      );

      const historyResult = await historyResponse.json();

      setVersions(historyResult || []);

      // MARKET DATA
      const marketResponse = await fetch(
        `/api/market?id=${normieId}`
      );

      const marketResult = await marketResponse.json();

      if (marketResult.tokens?.length > 0) {
        setMarketData(marketResult.tokens[0]);
      } else {
        setMarketData(null);
      }

    } catch (error) {

      console.error(error);

      alert("Error loading timeline");

    }

    setLoading(false);
  }

  const isListed =
    marketData?.market?.floorAsk?.price?.amount?.native;

  return (

    <main className="relative min-h-screen overflow-hidden bg-[#07090d] text-[#f5f1e8]">

      {/* CYAN GLOW */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">

        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400 blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 blur-3xl rounded-full animate-pulse"></div>

      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 px-6 py-20">

        {/* HERO */}
        <div className="text-center">

          <div className="uppercase tracking-[0.5em] text-cyan-300 text-sm mb-6">
            ONCHAIN EVOLUTION ENGINE
          </div>

          <h1
            className="text-6xl md:text-8xl font-black uppercase"
            style={{
              textShadow: "0 0 40px rgba(34,211,238,0.25)",
            }}
          >
            Normies
            <br />
            Time Machine
          </h1>

          {/* SEARCH */}
          <div className="mt-14 flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">

            <input
              value={normieId}
              onChange={(e) => setNormieId(e.target.value)}
              placeholder="ENTER NORMIE ID"
              className="flex-1 bg-[#111111] border border-cyan-400/30 px-6 py-5 text-lg uppercase tracking-widest outline-none focus:border-cyan-300"
              style={{
                boxShadow: "0 0 20px rgba(34,211,238,0.12)",
              }}
            />

            <button
              onClick={fetchNormie}
              className="bg-cyan-300 text-black px-10 py-5 font-black uppercase tracking-widest hover:scale-105 transition-all"
              style={{
                boxShadow: "0 0 30px rgba(34,211,238,0.25)",
              }}
            >
              {loading ? "SCANNING..." : "Scan Timeline"}
            </button>

          </div>

        </div>

        {/* MARKET DATA */}
        {marketData && (

          <div className="mt-20 grid md:grid-cols-5 gap-6 max-w-7xl mx-auto">

            {/* OWNER */}
            <div
              className="border border-cyan-400/30 bg-black/70 p-6"
              style={{
                boxShadow: "0 0 25px rgba(34,211,238,0.18)",
              }}
            >

              <div className="text-cyan-300 uppercase tracking-[0.25em] text-xs">
                Current Owner
              </div>

              <div className="mt-4 text-2xl font-black">
                {marketData.token?.owner
                  ? shortenAddress(marketData.token.owner)
                  : "Unknown"}
              </div>

            </div>

            {/* LIST STATUS */}
            <div
              className={`border p-6 ${
                isListed
                  ? "border-green-400/40"
                  : "border-red-500/40"
              } bg-black/70`}
              style={{
                boxShadow: isListed
                  ? "0 0 25px rgba(74,222,128,0.2)"
                  : "0 0 25px rgba(239,68,68,0.2)",
              }}
            >

              <div className="uppercase tracking-[0.25em] text-xs">

                {isListed ? "Listing Active" : "Market Status"}

              </div>

              <div className="mt-4 text-2xl font-black">

                {isListed
                  ? "LISTED"
                  : "NOT LISTED"}

              </div>

            </div>

            {/* CURRENT PRICE */}
            <div
              className="border border-cyan-400/30 bg-black/70 p-6"
              style={{
                boxShadow: "0 0 25px rgba(34,211,238,0.18)",
              }}
            >

              <div className="text-cyan-300 uppercase tracking-[0.25em] text-xs">
                Current Price
              </div>

              <div className="mt-4 text-2xl font-black">

                {isListed
                  ? `${marketData.market.floorAsk.price.amount.native} ETH`
                  : "—"}

              </div>

            </div>

            {/* LAST SALE */}
            <div
              className="border border-cyan-400/30 bg-black/70 p-6"
              style={{
                boxShadow: "0 0 25px rgba(34,211,238,0.18)",
              }}
            >

              <div className="text-cyan-300 uppercase tracking-[0.25em] text-xs">
                Last Sale
              </div>

              <div className="mt-4 text-2xl font-black">

                {marketData.token?.lastSale?.price?.amount?.native
                  ? `${marketData.token.lastSale.price.amount.native} ETH`
                  : "NO SALES"}

              </div>

            </div>

            {/* RANK */}
            <div
              className="border border-cyan-400/30 bg-black/70 p-6"
              style={{
                boxShadow: "0 0 25px rgba(34,211,238,0.18)",
              }}
            >

              <div className="text-cyan-300 uppercase tracking-[0.25em] text-xs">
                Mutation Rank
              </div>

              <div className="mt-4 text-2xl font-black">

                {versions.length > 5
                  ? "LEGENDARY"
                  : versions.length > 3
                  ? "CHAOTIC"
                  : versions.length > 1
                  ? "UNSTABLE"
                  : "STABLE"}

              </div>

            </div>

          </div>

        )}

        {/* NO MUTATIONS */}
        {searched && versions.length === 0 && (

          <div
            className="mt-24 max-w-5xl mx-auto border border-red-500/40 bg-black/70 p-10"
            style={{
              boxShadow: "0 0 45px rgba(239,68,68,0.22)",
            }}
          >

            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* IMAGE */}
              <div className="border border-red-500/30 bg-[#111111] p-10 flex items-center justify-center">

                <img
                  src={`https://api.normies.art/normie/${normieId}/image.png`}
                  alt="Normie"
                  className="w-72 h-72 object-contain"
                  style={{
                    imageRendering: "pixelated",
                  }}
                />

              </div>

              {/* INFO */}
              <div>

                <div className="uppercase tracking-[0.4em] text-red-400 text-sm mb-4">
                  Mutation Scan Result
                </div>

                <h2
                  className="text-5xl font-black mb-6"
                  style={{
                    textShadow: "0 0 25px rgba(239,68,68,0.4)",
                  }}
                >
                  NO MUTATIONS DETECTED
                </h2>

                <div className="text-zinc-400 leading-relaxed text-lg">

                  This Normie appears untouched.
                  No historical mutation data or version evolution has been recorded onchain.

                </div>

                {/* BAR */}
                <div className="mt-10">

                  <div className="flex justify-between mb-3 text-xs uppercase tracking-[0.25em] text-red-400">

                    <span>
                      Mutation Intensity
                    </span>

                    <span>
                      STABLE
                    </span>

                  </div>

                  <div className="w-full h-5 bg-[#111111] border border-red-500/30 overflow-hidden">

                    <div
                      className="h-full bg-red-500"
                      style={{
                        width: `2%`,
                        boxShadow:
                          "0 0 25px rgba(239,68,68,0.7)",
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* TIMELINE */}
        <div className="mt-24 max-w-6xl mx-auto relative">

          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-cyan-400/20 hidden md:block"></div>

          <div className="space-y-24">

            {versions.map((version, index) => {

              const evolutionScore =
                (version.changeCount + version.newPixelCount) *
                (version.version + 1);

              const severity =
                version.changeCount > 150
                  ? "LEGENDARY"
                  : version.changeCount > 75
                  ? "CHAOTIC"
                  : version.changeCount > 30
                  ? "UNSTABLE"
                  : "STABLE";

              return (

                <div
                  key={index}
                  className="relative border border-cyan-400/30 bg-black/70 backdrop-blur-xl p-8"
                  style={{
                    boxShadow: "0 0 45px rgba(34,211,238,0.14)",
                  }}
                >

                  {/* NODE */}
                  <div className="hidden md:block absolute left-1/2 top-10 -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-300 shadow-[0_0_25px_#22d3ee]"></div>

                  <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* IMAGE */}
                    <div className="border border-cyan-400/30 bg-[#111111] p-10 flex items-center justify-center">

                      <img
                        src={`https://api.normies.art/history/normie/${normieId}/version/${version.version}/image.png`}
                        alt={`Version ${version.version}`}
                        className="w-72 h-72 object-contain"
                        style={{
                          imageRendering: "pixelated",
                        }}
                      />

                    </div>

                    {/* INFO */}
                    <div>

                      <div className="uppercase tracking-[0.3em] text-cyan-300 text-sm mb-4">
                        Evolution Phase
                      </div>

                      <h2 className="text-6xl font-black mb-8">
                        V{version.version}
                      </h2>

                      {/* BAR */}
                      <div className="mb-10">

                        <div className="flex justify-between mb-3 text-xs uppercase tracking-[0.25em] text-cyan-300">

                          <span>
                            Mutation Intensity
                          </span>

                          <span>
                            {severity}
                          </span>

                        </div>

                        <div className="w-full h-5 bg-[#111111] border border-cyan-400/20 overflow-hidden">

                          <div
                            className="h-full bg-cyan-300 transition-all duration-700"
                            style={{
                              width: `${
                                Math.min(
                                  100,
                                  version.changeCount
                                )
                              }%`,
                              boxShadow:
                                "0 0 25px rgba(34,211,238,0.7)",
                            }}
                          />

                        </div>

                      </div>

                      {/* STATS */}
                      <div className="space-y-5 text-lg">

                        <div className="flex justify-between border-b border-cyan-400/20 pb-3">

                          <span className="text-zinc-500">
                            Pixel Changes
                          </span>

                          <span>
                            {version.changeCount}
                          </span>

                        </div>

                        <div className="flex justify-between border-b border-cyan-400/20 pb-3">

                          <span className="text-zinc-500">
                            Pixels Added
                          </span>

                          <span>
                            {version.newPixelCount}
                          </span>

                        </div>

                        <div className="flex justify-between border-b border-cyan-400/20 pb-3">

                          <span className="text-zinc-500">
                            Evolution Score
                          </span>

                          <span>
                            {evolutionScore}
                          </span>

                        </div>

                        <div className="flex justify-between border-b border-cyan-400/20 pb-3">

                          <span className="text-zinc-500">
                            Transformer
                          </span>

                          <span>
                            {shortenAddress(version.transformer)}
                          </span>

                        </div>

                      </div>

                      {/* LINKS */}
                      <div className="mt-8 flex flex-wrap gap-4">

                        <a
                          href={`https://etherscan.io/tx/${version.txHash}`}
                          target="_blank"
                          className="border border-cyan-400/30 px-5 py-3 hover:bg-cyan-300 hover:text-black transition-all"
                        >
                          Transaction
                        </a>

                        <a
                          href={`https://opensea.io/item/ethereum/0x9eb6e2025b64f340691e424b7fe7022ffde12438/${normieId}`}
                          target="_blank"
                          className="border border-cyan-400/30 px-5 py-3 hover:bg-cyan-300 hover:text-black transition-all"
                        >
                          OpenSea
                        </a>

                      </div>

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