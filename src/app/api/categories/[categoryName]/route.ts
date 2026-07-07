import { type NextRequest } from "next/server";
// import { categories } from "@/_mock/categories";
import { Category } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ categoryName: string }> },
) {
  const categoryName = (await params).categoryName
  // 🚧: DBに接続しレコードを取得する
  // const category = categories.find(
  //   (category) => category.name === categoryName,
  // );
  const category: Category | null = await prisma.category.findUnique({
    where: {
      name: categoryName
    }
  });

  if (!category) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ category });
}
