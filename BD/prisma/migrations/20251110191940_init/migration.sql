-- CreateTable
CREATE TABLE "Cliente" (
    "ID_Cliente" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Telefono" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("ID_Cliente")
);

-- CreateTable
CREATE TABLE "Mascota" (
    "ID_Mascota" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Tamano" TEXT NOT NULL,
    "ID_Cliente" INTEGER NOT NULL,

    CONSTRAINT "Mascota_pkey" PRIMARY KEY ("ID_Mascota")
);

-- CreateTable
CREATE TABLE "Servicio" (
    "ID_Servicio" SERIAL NOT NULL,
    "Nombre_Servicio" TEXT NOT NULL,
    "Costo" DOUBLE PRECISION NOT NULL,
    "Duracion_Estimada" INTEGER NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("ID_Servicio")
);

-- CreateTable
CREATE TABLE "Cita" (
    "ID_Cita" SERIAL NOT NULL,
    "Fecha" TIMESTAMP(3) NOT NULL,
    "Hora" TIMESTAMP(3) NOT NULL,
    "Notas_Adicionales" TEXT,
    "Estado" TEXT NOT NULL,
    "ID_Mascota" INTEGER NOT NULL,
    "ID_Servicio" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("ID_Cita")
);

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_ID_Cliente_fkey" FOREIGN KEY ("ID_Cliente") REFERENCES "Cliente"("ID_Cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_ID_Mascota_fkey" FOREIGN KEY ("ID_Mascota") REFERENCES "Mascota"("ID_Mascota") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_ID_Servicio_fkey" FOREIGN KEY ("ID_Servicio") REFERENCES "Servicio"("ID_Servicio") ON DELETE RESTRICT ON UPDATE CASCADE;
