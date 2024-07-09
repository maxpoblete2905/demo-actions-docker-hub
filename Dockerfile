# Etapa 1: Compilación
FROM node:18-alpine AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Ejecuta el comando de compilación (ajusta según tu proyecto)
RUN npm run build

# Etapa 2: Ejecución
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de compilación
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Copia el archivo JSON desde la raíz del proyecto al contenedor
COPY test-develop-80a95-SC.json /app/credentials/test-develop-80a95-SC.json

# Instala solo las dependencias de producción
RUN npm ci --only=production

# Expone el puerto que utiliza la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
