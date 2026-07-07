//import { categories } from "@/_mock/categories";
import { Category } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET() {

  // const categories: Category[] = await prisma.category.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     label: true,
  //     description: true,
  //     imageUrl: true,
  //   }
  // });
  const categories: Category[] = await prisma.category.findMany();
  categories.map(c => {
    console.log(c.id + "," + c.name + "," + c.label + "," + c.description + "," + c.imageUrl);
  });

  console.log(Response.json({ categories }));

  // 🚧: DBに接続しレコードを取得する
  //return Response.json({ categories });
  return Response.json({ categories });
}
