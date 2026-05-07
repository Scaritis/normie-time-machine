export async function GET(request) {

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const CONTRACT =
    "0x9Eb6E2025B64f340691e424b7fe7022fFDE12438";

  try {

    const response = await fetch(
      `https://api.reservoir.tools/tokens/v7?tokens=${CONTRACT}%3A${id}&includeLastSale=true`,
      {
        headers: {
          accept: "*/*",
          "x-api-key": "demo-api-key",
        },
      }
    );

    const data = await response.json();

    return Response.json(data);

  } catch (error) {

    return Response.json({
      error: "Failed to fetch market data",
    });

  }
}