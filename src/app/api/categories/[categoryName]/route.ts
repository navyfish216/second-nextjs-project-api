import { type NextRequest } from "next/server";
import { type CategoryWithPhotos } from "@/type";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ categoryName: string }> },
) {
  console.log("get category by categoryName");
  const categoryName = (await params).categoryName
  // 🚧: DBに接続しレコードを取得する
  const category: CategoryWithPhotos | null = await prisma.category.findUnique({
    where: {
      name: categoryName
    }, 
    include: {
      photos: true
    }
  });

  if (!category) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ category });
}
