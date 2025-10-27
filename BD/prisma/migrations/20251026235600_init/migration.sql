-- CreateTable
CREATE TABLE "Cliente" (
    "ID_Cliente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mascota" (
    "ID_Mascota" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Tamano" TEXT NOT NULL,
    "ID_Cliente" INTEGER NOT NULL,
    CONSTRAINT "Mascota_ID_Cliente_fkey" FOREIGN KEY ("ID_Cliente") REFERENCES "Cliente" ("ID_Cliente") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Servicio" (
    "ID_Servicio" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre_Servicio" TEXT NOT NULL,
    "Costo" REAL NOT NULL,
    "Duracion_Estimada" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cita" (
    "ID_Cita" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Fecha" DATETIME NOT NULL,
    "Hora" DATETIME NOT NULL,
    "Notas_Adicionales" TEXT,
    "Estado" TEXT NOT NULL,
    "ID_Mascota" INTEGER NOT NULL,
    "ID_Servicio" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cita_ID_Mascota_fkey" FOREIGN KEY ("ID_Mascota") REFERENCES "Mascota" ("ID_Mascota") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cita_ID_Servicio_fkey" FOREIGN KEY ("ID_Servicio") REFERENCES "Servicio" ("ID_Servicio") ON DELETE RESTRICT ON UPDATE CASCADE
);
