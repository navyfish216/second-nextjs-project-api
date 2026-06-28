import { type NextRequest } from "next/server";
import { photos } from "@/_mock/photos";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ photoId: string }> },
) {
  const photoId = (await params).photoId;
  // 🚧: DBに接続しレコードを取得する
  const photo = photos.find((photo) => photo.id === photoId);
  if (!photo) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ photo });
}
