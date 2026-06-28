import { type NextRequest } from "next/server";
import { categories } from "@/_mock/categories";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const categoryId = (await params).categoryId;
  // 🚧: DBに接続しレコードを取得する
  const category = categories.find(
    (category) => category.id === categoryId,
  );
  if (!category) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ category });
}
