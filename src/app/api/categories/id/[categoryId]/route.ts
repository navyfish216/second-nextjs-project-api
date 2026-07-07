import { type NextRequest } from "next/server";
//import { categories } from "@/_mock/categories";
import { Category } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const categoryId = (await params).categoryId;
  // 🚧: DBに接続しレコードを取得する
  // const category = categories.find(
  //   (category) => category.id === categoryId,
  // );
  const category: Category | null = await prisma.category.findUnique({
    where: {
      id: categoryId
    }
  });
  if (!category) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ category });
}
