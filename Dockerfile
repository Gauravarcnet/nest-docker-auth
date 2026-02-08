FROM node:18

WORKDIR /app

# install netcat (important)
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

COPY scripts/wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

EXPOSE 3000

CMD ["/wait-for-mysql.sh", "&&", "node", "dist/main.js"]
