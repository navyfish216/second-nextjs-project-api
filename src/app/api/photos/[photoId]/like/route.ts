import { headers } from 'next/headers';
import { type NextRequest } from "next/server";
import { type Like, LikedAndLikes, User } from "@/type";
import { prisma } from "@/lib/prisma";
import { sleepIfFlagTrue } from "@/lib/sleep";
import { getAccessTokenMap } from '@/util/auth';

async function getUser(): Promise<User | undefined> {

  // リクエストヘッダーからトークンを取得
  const headersList = await headers();
  let token = headersList.get('X-Access-Token');
  token = !!token ? token : "";
  console.log(`X-Access-Token: ${token}`);

  return getAccessTokenMap(token);
}

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
  const user = await getUser();

  if (user === undefined) {
    console.log("GET error: 'Unauthorized'");
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(`GET userId: ${user?.userId}`);
  const userId = user?.userId;

  const photoId = (await params).photoId;
  if (!userId) {
    return Response.json({ message: "Invalid Params" }, { status: 400 });
  }

  const likedAndLikes: LikedAndLikes = await getLike(photoId, userId);

  // 画面のローディング確認用にスリープする
  await sleepIfFlagTrue(500);

  return Response.json(likedAndLikes);
}

export async function POST(
  request: NextRequest,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;
  const user = await getUser();

  if (user === undefined) {
    console.log("POST error: 'Unauthorized'");
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(`POST userId: ${user?.userId}`);
  const userId = user?.userId;

  if (!userId) {
    return Response.json({ message: "Invalid Params" }, { status: 400 });
  }

  // 対象の写真に対してユーザーがいいねしているかを取得
  const like: Like | null = await getUserLike(photoId, userId);

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

  // 画面の非活性確認用にスリープする
  await sleepIfFlagTrue(3000);

  return Response.json("");
}