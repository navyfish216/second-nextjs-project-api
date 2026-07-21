import formatDate from "@/util/formatDate";

const isSleep: boolean = process.env.SLEEP_FLG === 'true';

// 引数で渡したミリ秒分スリープする
export async function sleepIfFlagTrue(ms: number) {

  if (isSleep) {
    console.log(`${formatDate(new Date())} sleep start`);
    await new Promise((res) => setTimeout(res, ms));
    console.log(`${formatDate(new Date())} sleep end`);
  }
}