# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:22.12.0-bullseye-slim as builder

RUN apt-get update \
    && apt-get install -y curl git build-essential libffi-dev libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev \
    && apt install sqlite3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .


ENV PYENV_ROOT="/root/.pyenv"
ENV PATH="$PYENV_ROOT/bin:$PATH"
RUN curl https://pyenv.run | bash \
    && echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc \
    && echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc \
    && echo 'eval "$(pyenv init --path)"' >> ~/.bashrc

ENV PATH="/root/.pyenv/shims:$PATH"
RUN pyenv install 3.9.18 \
    && pyenv global 3.9.18 \
    && python -m venv venv \
    && pip install --upgrade pip

RUN npm install -g dbdocs

RUN cd backend && pip install python-dotenv && pip install -r requirements.txt

RUN cd frontend && npm install && npm install web-vitals axios
