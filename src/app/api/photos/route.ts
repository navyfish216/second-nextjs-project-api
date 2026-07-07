//import { photos } from "@/_mock/photos";
import { Photo } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const photos: Photo[] = await prisma.photo.findMany();

  console.log("GET /api/photos");
  // 🚧: DBに接続しレコードを取得する
  return Response.json({ photos });
}

export const dynamic = "force-dynamic";
