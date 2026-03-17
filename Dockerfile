FROM node:24 AS base
WORKDIR /usr/local/app

FROM base AS frontend-base
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/eslint.config.js frontend/index.html frontend/vite.config.js ./
COPY frontend/public ./public
COPY frontend/src ./src

FROM frontend-base AS frontend-dev
CMD ["npm", "run", "dev"]

FROM base AS backend-base
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/src ./src

FROM backend-base AS backend-dev
CMD ["npm", "run", "docker-dev"]

FROM base AS dummy-news-publisher-base
COPY dummy-news-publisher-server/package.json dummy-news-publisher-server/package-lock.json ./
RUN npm install
COPY dummy-news-publisher-server/src ./src
CMD ["npm", "run", "docker-dev"]

FROM base AS milvus-vector-database-access-server-base
COPY milvus-vector-database-access-server/package.json milvus-vector-database-access-server/package-lock.json ./
RUN npm install
COPY milvus-vector-database-access-server/src ./src
CMD ["npm", "run", "docker-dev"]

FROM python:3.14.2 AS kafka-python
WORKDIR /usr/src/app

COPY kafka-consumers/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY kafka-consumers/consumer.py kafka-consumers/user_consumer.py kafka-consumers/user_preference_consumer.py .
CMD ["python", "consumer.py"]
CMD ["python", "user_consumer.py"]
CMD ["python", "user_preference_consumer.py"]


