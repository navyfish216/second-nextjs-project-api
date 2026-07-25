import { type CategoryWithPhotos } from "@/type";
import { prisma } from "@/lib/prisma";

export async function GET() {

  // 🚧: DBに接続しレコードを取得する
  // const categories: Category[] = await prisma.category.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     label: true,
  //     description: true,
  //     imageUrl: true,
  //   }
  // });
  const categories: CategoryWithPhotos[] = await prisma.category.findMany({
    include: {
      photos: true
    }
  });

  return Response.json({ categories });
}
