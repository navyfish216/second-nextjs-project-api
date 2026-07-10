import { type NextRequest } from "next/server";
//import { categories } from "@/_mock/categories";
import { CategoryWithPhotos } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  console.log("get category by categoryId");
  const categoryId = (await params).categoryId;
  // 🚧: DBに接続しレコードを取得する
  // const category = categories.find(
  //   (category) => category.id === categoryId,
  // );
  const category: CategoryWithPhotos | null = await prisma.category.findUnique({
    where: {
      id: categoryId
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
