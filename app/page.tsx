"use client";

import { useState } from "react";

export default function Home() {
  const [normieId, setNormieId] = useState("");
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNormie() {
    if (!normieId) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.normies.art/history/normie/${normieId}/versions`
      );

      const result = await response.json();

      setVersions(result || []);
    } catch (error) {
      console.error(error);
      alert("Error loading timeline");
    }

    setLoading(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-[#f5f1e8]">

      {/* SMOKE */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 px-6 py-20">

        {/* HERO */}
        <div className="text-center">

          <h1
            className="text-6xl md:text-8xl font-black uppercase"
            style={{
              textShadow: "4px 4px 0px rgba(255,255,255,0.1)",
            }}
          >
            Normie
            <br />
            Time Machine
          </h1>

          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto">
            Witness the complete on-chain evolution of any Normie.
          </p>

          {/* SEARCH */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">

            <input
              value={normieId}
              onChange={(e) => setNormieId(e.target.value)}
              placeholder="ENTER NORMIE ID"
              className="flex-1 bg-[#111111] border border-zinc-700 px-6 py-5 text-lg uppercase tracking-widest outline-none focus:border-white"
            />

            <button
              onClick={fetchNormie}
              className="bg-[#f5f1e8] text-black px-10 py-5 font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              Scan Timeline
            </button>
          </div>

          {loading && (
            <div className="mt-8 animate-pulse uppercase tracking-[0.3em] text-zinc-500">
              Accessing Timeline...
            </div>
          )}
        </div>

        {/* EMPTY STATE */}
        {!loading && versions.length === 0 && (
          <div className="mt-20 text-center text-zinc-600 uppercase tracking-[0.3em]">
            No recorded mutations found for this Normie.
          </div>
        )}

        {/* TIMELINE */}
        <div className="mt-20 max-w-6xl mx-auto space-y-16">

          {versions.map((version, index) => (

            <div
              key={index}
              className="border border-zinc-800 bg-black/60 backdrop-blur-xl p-8"
            >

              <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* IMAGE */}
                <div className="border border-zinc-800 bg-[#111111] p-10 flex items-center justify-center">

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

                  <div className="uppercase tracking-[0.3em] text-zinc-500 text-sm mb-4">
                    Historical Version
                  </div>

                  <h2 className="text-5xl font-black mb-8">
                    V{version.version}
                  </h2>

                  <div className="space-y-5 text-lg">

                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                      <span className="text-zinc-500">
                        Pixel Changes
                      </span>

                      <span>
                        {version.changeCount}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                      <span className="text-zinc-500">
                        Total Pixels
                      </span>

                      <span>
                        {version.newPixelCount}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                      <span className="text-zinc-500">
                        Block
                      </span>

                      <span>
                        {version.blockNumber}
                      </span>
                    </div>

                  </div>

                  {/* TIMELINE LINE */}
                  {index !== versions.length - 1 && (
                    <div className="mt-10 h-20 w-[1px] bg-zinc-700 ml-2"></div>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}