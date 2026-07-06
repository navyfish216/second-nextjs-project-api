import { categories } from "@/_mock/categories";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const categoriesFromDb = await prisma.category.findMany();
  categoriesFromDb.map(c => {
    console.log(c.id + "," + c.name + "," + c.label + "," + c.description + "," + c.imageUrl);
  });

  // 🚧: DBに接続しレコードを取得する
  return Response.json({ categories });
}
