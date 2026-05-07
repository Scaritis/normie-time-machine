export async function GET(req) {

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  const contract =
    "0x9eb6e2025b64f340691e424b7fe7022ffde12438";

  const API_KEY =
    process.env.OPENSEA_API_KEY;

  try {

    // NFT DETAILS
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

    // LISTINGS
    const listingResponse = await fetch(
      `https://api.opensea.io/api/v2/orders/ethereum/seaport/listings?asset_contract_address=${contract}&token_ids=${id}&limit=1`,
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

    // LISTING
    const order =
      listingData?.orders?.[0];

    const currentPrice =
      order?.current_price
        ? (
            Number(order.current_price) / 1e18
          ).toFixed(2)
        : null;

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