import { type NextRequest } from "next/server";
import { type Like } from "@/type";
import { prisma } from "@/lib/prisma";

type LikedAndLikes = {
  liked: boolean;
  likes: number;
};

async function getUserLike(photoId: string, userId: string): Promise<Like | null> {

  // 対象の写真に対してユーザーがいいねしているかを取得
  const like: Like | null = await prisma.like.findFirst({
    where: { 
      photoId: photoId,
      userId: userId
    },
  });

  return like;
}

async function getLike(photoId: string, userId: string): Promise<LikedAndLikes> {

  // 対象の写真に対するいいね数を取得
  const likes: number = await prisma.like.count({
    where: { 
      photoId: photoId
    },
  });

  // 対象の写真に対してユーザーがいいねしているかを取得
  const like: Like | null = await getUserLike(photoId, userId);

  return ({
    liked: !!like,
    likes: likes
  });
}

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

  const likedAndLikes: LikedAndLikes = await getLike(photoId, userId);

  return Response.json(likedAndLikes);
}

export async function POST(
  request: NextRequest,
  {params}: {params: Promise<{photoId: string}>}
) {
  const body = await request.json();
  const userId = body.userId;
  const photoId = (await params).photoId;

  // 対象の写真に対してユーザーがいいねしているかを取得
  let like: Like | null = await getUserLike(photoId, userId);

  // トランザクション内でDB書き込み
  await prisma.$transaction(async (tx) => {
    // いいね済かどうかによって処理分岐
    if (like === null) {
      // いいねしていない場合は登録
      await tx.like.create({
        data: { photoId: photoId, userId: userId },
      });
    } else {
      // いいね済の場合は削除
      await tx.like.deleteMany({
        where: { photoId: photoId, userId: userId },
      });
    }
  });

  return Response.json("");
}