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
  // categories.map(c => {
  //   console.log(c.id + "," + c.name + "," + c.label + "," + c.description + "," + c.imageUrl);
  //   c.photos.map(p => {
  //     console.log(p.imageUrl);
  //   })
  // });
  // console.log(Response.json({ categories }));

  return Response.json({ categories });
}
