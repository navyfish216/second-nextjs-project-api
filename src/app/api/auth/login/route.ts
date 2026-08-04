import { type NextRequest } from "next/server";
import { setRefreshTokenMap } from "@/util/auth";

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

export async function POST(
  request: NextRequest
) {
  const date = new Date();
  const body = await request.json();
  const userId = body.userId;
  const password = body.password;
  console.log(`${formatDate(date)} login POST userId: ${userId} password: ${password}`);

  const timestamp = formatDateToTimestamp(date);
  const refreshToken = `dummy-refresh-token-${timestamp}`;
  setRefreshTokenMap(refreshToken, userId);
  console.log(`${formatDate(new Date())} login POST refresh-tokenを設定 : ${refreshToken}`);

  return Response.json(JSON.stringify({"refreshToken": `${refreshToken}`}));
}