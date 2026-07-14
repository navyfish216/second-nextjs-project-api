import { type Photo } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // 🚧: DBに接続しレコードを取得する
  const photos: Photo[] = await prisma.photo.findMany();
  return Response.json({ photos });
}

export const dynamic = "force-dynamic";
