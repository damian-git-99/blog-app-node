FROM node:16.14.0-alpine3.14 as build
# Set working directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Create a smaller image for production
FROM  nginx:1.24.0-alpine-slim
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]