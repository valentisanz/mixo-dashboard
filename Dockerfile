# Usar la imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración necesarios y las dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir el proyecto Next.js
RUN npm run build

# Exponer el puerto en el que corre Next.js (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
