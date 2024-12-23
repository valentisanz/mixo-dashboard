# Etapa de construcción
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias y instalarlas
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Etapa final para producción
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app ./

# Instalar dependencias de producción
RUN npm install --production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
