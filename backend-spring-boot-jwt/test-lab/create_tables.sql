
DROP TABLE  user_roles;

DROP TABLE  Roles;

DROP TABLE  Users;

DROP TABLE  tareas;

DROP TABLE  proyectos;

CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
);



CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_finalizacion DATE NOT NULL,
    usuario_id BIGINT,
    FOREIGN KEY (usuario_id) REFERENCES Users(id) ON DELETE SET NULL -- Usuario responsable del proyecto
);

CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(255) DEFAULT 'PENDIENTE',
    proyecto_id BIGINT,
    asignada_a BIGINT,  -- Usuario al que se le asigna la tarea
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,  -- Si se elimina el proyecto, se eliminan las tareas asociadas
    FOREIGN KEY (asignada_a) REFERENCES Users(id) ON DELETE SET NULL     -- Si se elimina el usuario asignado, se desasigna la tarea
);


INSERT INTO Roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO Roles (name) VALUES ('ROLE_USER');

INSERT INTO Users (username, nombre, email, password) VALUES ('admin', 'admin' , 'admin@gmail.com', '$2a$10$aIZH072mVsHAg9DPk4xqtOQA6IJicGCcKV73GmukMTayiKV7aTZiu');
INSERT INTO Users (username, nombre,email, password) VALUES ('user', 'user' , 'user@gmail.com', '$2a$10$aIZH072mVsHAg9DPk4xqtOQA6IJicGCcKV73GmukMTayiKV7aTZiu');


INSERT INTO user_roles (user_id, role_id) VALUES (1, 1); -- Admin con ROLE_ADMIN
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2); -- User con ROLE_USER

