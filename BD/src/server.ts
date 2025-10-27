import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Simple request logger to help debug hanging requests
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

/* === CLIENTES === */

// Ruta raíz para verificar que el backend está activo
app.get("/", (_req, res) => {
  console.log("GET / - root handler hit");
  res.send("🚀 Backend funcionando correctamente - Prisma + Express");
});

// Obtener todos los clientes con sus mascotas
app.get("/clientes", async (_req, res) => {
  const clientes = await prisma.cliente.findMany({ include: { Mascotas: true } });
  res.json(clientes);
});

// Crear un cliente nuevo
app.post("/clientes", async (req, res) => {
  const { Nombre, Telefono } = req.body;
  const cliente = await prisma.cliente.create({ data: { Nombre, Telefono } });
  res.json(cliente);
});

/* === MASCOTAS === */

// Obtener todas las mascotas con su cliente
app.get("/mascotas", async (_req, res) => {
  const mascotas = await prisma.mascota.findMany({ include: { Cliente: true } });
  res.json(mascotas);
});

// Crear una mascota vinculada a un cliente
app.post("/mascotas", async (req, res) => {
  const { Nombre, Tamano, ID_Cliente } = req.body;
  const mascota = await prisma.mascota.create({
    data: { Nombre, Tamano, ID_Cliente },
  });
  res.json(mascota);
});

/* === SERVICIOS === */

// Listar servicios
app.get("/servicios", async (_req, res) => {
  const servicios = await prisma.servicio.findMany();
  res.json(servicios);
});

// Crear servicio
app.post("/servicios", async (req, res) => {
  const { Nombre_Servicio, Costo, Duracion_Estimada } = req.body;
  const servicio = await prisma.servicio.create({
    data: { Nombre_Servicio, Costo, Duracion_Estimada },
  });
  res.json(servicio);
});

/* === CITAS === */

// Mostrar todas las citas (con mascota y servicio)
app.get("/citas", async (_req, res) => {
  const citas = await prisma.cita.findMany({
    include: { Mascota: true, Servicio: true },
  });
  res.json(citas);
});

// Crear nueva cita
app.post("/citas", async (req, res) => {
  const { Fecha, Hora, Notas_Adicionales, Estado, ID_Mascota, ID_Servicio } = req.body;
  try {
    // Convierte Fecha y Hora a objetos Date o ISO strings
    const fechaIso = new Date(Fecha).toISOString();

    // Si Hora es solo hora, combínala con la fecha:
    // Asume hora en formato "HH:mm", añade segundos para ISO
    const horaIso = new Date(`${Fecha}T${Hora}:00`).toISOString();

    const cita = await prisma.cita.create({
      data: {
        Fecha: fechaIso,
        Hora: horaIso,
        Notas_Adicionales,
        Estado,
        ID_Mascota,
        ID_Servicio,
      },
    });
    res.json(cita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando cita" });
  }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


