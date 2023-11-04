# Étape de construction
FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm build

# Étape de production
FROM nginx:alpine AS production
COPY --from=build /app/dist/personal-training-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
