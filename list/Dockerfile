FROM mhart/alpine-node:9.3.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i --production

FROM mhart/alpine-node:base-9.3.0
WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000

