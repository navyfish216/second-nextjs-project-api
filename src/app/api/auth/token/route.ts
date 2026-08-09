import { headers } from 'next/headers';
import { type NextRequest } from "next/server";
import { getRefreshTokenMap, setAccessTokenMap } from "@/util/auth";

function formatDate(date: Date): string {
  
  // Intl.DateTimeFormat を使用したミリ秒の取得
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3 // ミリ秒を3桁で指定
  });

  return formatter.format(date);    
}

function formatDateToTimestamp(date: Date): string {
  
  // Intl.DateTimeFormat を使用したミリ秒の取得
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3 // ミリ秒を3桁で指定
  });

  return formatter.format(date).replace(/\//g, '').replace(/\s/g, '_').replace(/:/g, '').replace(/\./g, '_');
}

export async function GET(
  _: NextRequest
) {
  // リクエストヘッダーからトークンを取得
  const headersList = await headers();
  let token = headersList.get('X-Refresh-Token');
  token = !!token ? token : "";
  console.log(`GET X-Refresh-Token: ${token}`);
  
  const user = getRefreshTokenMap(token);

  if (user === undefined) {
    console.log("error: 'Unauthorized'");
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.userId;
  console.log(`POST userId: ${userId}`);
  
  const date = new Date();
  const timestamp = formatDateToTimestamp(date);
  const accessToken = `dummy-access-token-${timestamp}`;
  setAccessTokenMap(accessToken, userId);
  console.log(`${formatDate(new Date())} auth POST access-tokenを設定 : ${accessToken}`);

  return Response.json(JSON.stringify({"accessToken": `${accessToken}`}));
}