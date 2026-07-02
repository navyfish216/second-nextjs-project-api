import { type NextRequest } from "next/server";

export async function POST(
  _: NextRequest,
  {params}: {params: Promise<{photoId: string}>}
) {
  console.log(`photoId ${(await params).photoId} が「いいね」されました`);
  return Response.json({liked: true});
}