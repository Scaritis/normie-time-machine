export async function GET(req) {

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  const contract =
    "0x9eb6e2025b64f340691e424b7fe7022ffde12438";

  const collectionSlug =
    "normies";

  const API_KEY =
    process.env.OPENSEA_API_KEY;

  try {

    // NFT DATA
    const nftResponse = await fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/contract/${contract}/nfts/${id}`,
      {
        headers: {
          accept: "application/json",
          "x-api-key": API_KEY,
        },
        cache: "no-store",
      }
    );

    const nftData =
      await nftResponse.json();

    // BEST LISTING
    const listingResponse = await fetch(
      `https://api.opensea.io/api/v2/listings/collection/${collectionSlug}/nfts/${id}/best`,
      {
        headers: {
          accept: "application/json",
          "x-api-key": API_KEY,
        },
        cache: "no-store",
      }
    );

    const listingData =
      await listingResponse.json();

    console.log(
      "LISTING DATA:",
      JSON.stringify(listingData, null, 2)
    );

    // OWNER
    let owner = "Unknown";

    if (
      nftData?.nft?.owners &&
      nftData.nft.owners.length > 0
    ) {

      owner =
        nftData.nft.owners[0]?.username ||
        nftData.nft.owners[0]?.address ||
        "Unknown";

    }

    // PRICE
    let currentPrice = null;

    if (
      listingData?.price?.current?.value
    ) {

      currentPrice =
        (
          Number(
            listingData.price.current.value
          ) / 1e18
        ).toFixed(2);

    }

    return Response.json({

      owner,

      listed: !!currentPrice,

      currentPrice,

    });

  } catch (e) {

    console.log(e);

    return Response.json({

      owner: "Unknown",

      listed: false,

      currentPrice: null,

    });

  }

}