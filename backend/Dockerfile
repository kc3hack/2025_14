# syntax=docker/dockerfile:latest

# 🔹 ビルド用ステージ（Python 3.10 ベース）
FROM --platform=linux/amd64 python:3.9.18-slim-bookworm AS builder

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl git build-essential libffi-dev libssl-dev \
    zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev sqlite3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの作成
WORKDIR /app

# 依存関係ファイルをコピー
COPY requirements.txt .

# `pip install` を直接実行（仮想環境なし）
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir python-dotenv \
    && pip install --no-cache-dir -r requirements.txt

# 🔹 実行環境（最適化された軽量ステージ）
FROM --platform=linux/amd64 python:3.9.18-slim-bookworm AS final

# 必要なパッケージのみインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    libssl-dev libsqlite3-0 sqlite3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの作成
WORKDIR /app

# `builder` ステージからインストール済みパッケージをコピー
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# アプリケーションコードをコピー
COPY . .

# アプリケーション起動
CMD ["python", "app.py"]
