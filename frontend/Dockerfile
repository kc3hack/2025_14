# syntax=docker/dockerfile:latest

# 🔹 ビルド用ステージ
FROM --platform=linux/amd64 node:22.12.0-bullseye-slim AS builder

# 必要なパッケージをインストール（最小限に抑える）
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl git build-essential libffi-dev libssl-dev \
    zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 環境変数を設定（Render の `PORT` を利用）
ENV PORT=10000

# 作業ディレクトリの作成
WORKDIR /app

# package.json と package-lock.json を先にコピー（キャッシュの最適化）
COPY package*.json ./

RUN npm ci

# 残りのアプリケーションコードをコピー
COPY . .

# ビルド（もし必要なら）
# RUN npm run build

# ポートを公開（Render の `PORT` に対応）
EXPOSE $PORT

# アプリケーション起動
CMD ["npm", "start"]
