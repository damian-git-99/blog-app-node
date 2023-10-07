# Creating a new image with dev devendencies. 
FROM node:18-alpine as devendencies-dev
WORKDIR /app
COPY package.json .
RUN npm install

FROM node:18-alpine as build
WORKDIR /app
COPY --from=devendencies-dev /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Creating a new image with the prod devendencies. 
FROM node:18-alpine as devendencies-prod
WORKDIR /app
COPY package.json .
RUN npm install --omit-dev

# Copying the package.json file to the image and running npm install.
FROM node:18-alpine as production
WORKDIR /app
COPY package.json .
COPY ./config ./config
COPY --from=build /app/build ./build
COPY --from=devendencies-prod /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]