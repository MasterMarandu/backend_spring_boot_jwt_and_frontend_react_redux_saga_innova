# Getting Started

### Reference Documentation

Abre una terminal en el directorio del archivo docker-compose.yml y ejecuta el siguiente comando para iniciar el contenedor de PostgreSQL:

`docker-compose up -d`

Copiar el archivo .sql al contenedor

# 1. Listar contenedores

docker ps

# 2. Copiar el script al contenedor

docker cp ./create_tables.sql <nombre_del_contenedor>:/tmp/create_tables.sql

# 3. Acceder al contenedor

docker exec -it <nombre_del_contenedor> bash

# 4. Ejecutar el script en la base de datos

psql -U user -d mydatabase -f /tmp/create_tables.sql
