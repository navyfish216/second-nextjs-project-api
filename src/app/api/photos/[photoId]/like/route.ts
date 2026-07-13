import { type NextRequest } from "next/server";
import { Like } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ photoId: string }> },
) {
  const { searchParams } = new URL(request.url);
  const photoId = (await params).photoId;
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({ message: "Invalid Params" }, { status: 400 });
  }

  const likes: number = await prisma.like.count({
    where: { 
      photoId: photoId
    },
  });

  const like: Like | null = await prisma.like.findFirst({
    where: { 
      photoId: photoId,
      userId 
    },
  });

  return Response.json({ 
    liked: !!like, 
    likes: likes 
  });
}

export async function POST(
  _: NextRequest,
  {params}: {params: Promise<{photoId: string}>}
) {
  console.log(`photoId ${(await params).photoId} が「いいね」されました`);
  return Response.json({liked: true});
}