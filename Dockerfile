# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar dependencias incluyendo las de desarrollo para compilar
RUN npm ci

# Copiar todo el código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine

# Argumentos para configuración en tiempo de compilación
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar el código compilado desde la etapa de build
COPY --from=build /app/dist ./dist

# Exponer el puerto (ajusta según tu configuración)
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]