# Utilizamos una imagen oficial de Node.js como base
FROM node:16-alpine

# Establecemos el directorio de trabajo en /app
WORKDIR /app

# Copiamos solo los archivos necesarios para la instalación de dependencias
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm ci --production

# Variable de entorno
ENV DB_HOST localhost
ENV HOST localhost

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Exponemos el puerto en el que la aplicación escucha (si es necesario)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]