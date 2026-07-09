import { type NextRequest } from "next/server";
//import { photos } from "@/_mock/photos";
import { PhotoWithCategory } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ photoId: string }> },
) {
  const photoId = (await params).photoId;
  // 🚧: DBに接続しレコードを取得する
  // const photo = photos.find((photo) => photo.id === photoId);
  const photo: PhotoWithCategory | null = await prisma.photo.findUnique({
    where: {
      id: photoId
    },
    include: {
      category: true
    }
  });

  // console.log(photo?.title);
  // console.log(photo?.imageUrl);
  // console.log(photo?.category.name);
  // console.log(photo?.category.label);

  if (!photo) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ photo });
}
