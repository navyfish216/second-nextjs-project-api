import { type NextRequest } from "next/server";
//import { photos } from "@/_mock/photos";
import { Photo } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ photoId: string }> },
) {
  const photoId = (await params).photoId;
  // 🚧: DBに接続しレコードを取得する
  // const photo = photos.find((photo) => photo.id === photoId);
  const photo: Photo | null = await prisma.photo.findUnique({
    where: {
      id: photoId
    }
  });

  if (!photo) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ photo });
}
