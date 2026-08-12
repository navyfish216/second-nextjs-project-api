import { type NextRequest } from "next/server";
import { setRefreshTokenMap } from "@/util/auth";
import { formatDate, formatDateToTimestamp } from "@/util/formatDate";

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