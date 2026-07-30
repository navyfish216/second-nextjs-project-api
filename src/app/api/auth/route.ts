import { type NextRequest } from "next/server";
import { setUserMap } from "@/util/auth";

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
  console.log(`${formatDate(date)} auth POST userId: ${userId} password: ${password}`);

  const timestamp = formatDateToTimestamp(date);
  const authToken = `dummy-token-${timestamp}`;
  setUserMap(authToken, userId);
  console.log(`${formatDate(new Date())} auth POST auth-tokenを設定 : ${authToken}`);

  return Response.json(JSON.stringify({"authToken": `${authToken}`}));
}