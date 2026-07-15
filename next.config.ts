import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 全ての API routes にマッチ
  async headers() {
    return [
      {
        // 対象APIのパスパターン
        // 今回は src/app/api/ 配下にAPIを作っているので下記のようにする
        source: "/api/:path*",
        headers: [
          {
            // CORSを許可するオリジン
            key: "Access-Control-Allow-Origin",
            // すべてのオリジンを許可するなら * (アスタリスク)
            // ただセキュリティ的にはよろしくないので注意
            value: "http://localhost:4000",
          },
          {
            // 許可するメソッド
            key: "Access-Control-Allow-Methods",
            value: "OPTIONS,GET,POST,PUT,DELETE",
          },
          {
            // 許可するリクエストヘッダ
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
