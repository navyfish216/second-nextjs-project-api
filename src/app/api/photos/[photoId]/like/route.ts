import { type NextRequest } from "next/server";
import { Like } from "@/_mock";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ photoId: string }> },
) {
  const photoId = (await params).photoId;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({ message: "Invalid Params" }, { status: 400 });
  }

  // 対象の写真に対するいいね数を取得
  const likes: number = await prisma.like.count({
    where: { 
      photoId: photoId
    },
  });

  // 対象の写真に対してユーザーがいいねしているかを取得
  const like: Like | null = await prisma.like.findFirst({
    where: { 
      photoId: photoId,
      userId: userId
    },
  });

  return Response.json({ 
    liked: !!like, 
    likes: likes 
  });
}

export async function POST(
  request: NextRequest,
  {params}: {params: Promise<{photoId: string}>}
) {
  const body = await request.json();
  const userId = body.userId;
  const photoId = (await params).photoId;

  // 対象の写真に対してユーザーがいいねしているかを取得
  let like: Like | null = await prisma.like.findFirst({
    where: { 
      photoId: photoId,
      userId: userId
    },
  });

  // いいね済かどうかによって処理分岐
  if (like === null) {
    // いいねしていない場合は登録
    console.log("いいねします");
    await prisma.like.create({
      data: { photoId: photoId, userId: userId },
    });
  } else {
    // いいね済の場合は削除
    console.log("いいねを取り消します");
    await prisma.like.deleteMany({
      where: { photoId: photoId, userId: userId },
    });
  }

  // DB登録後のいいね数を取得
  const likes: number = await prisma.like.count({
    where: { 
      photoId: photoId
    },
  });

  // 対象の写真に対してユーザーがいいねしているかを再取得
  like = await prisma.like.findFirst({
    where: { 
      photoId: photoId,
      userId: userId
    },
  });

  // 登録後のいいね状態を返却
  return Response.json({ 
    liked: !!like, 
    likes: likes 
  });
}