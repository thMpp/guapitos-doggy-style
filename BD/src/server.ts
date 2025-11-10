import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "*"
}));
app.get("/health", (_req, res) => res.json({ok:true}));

app.use((req, _res, next) => {
  req.url = req.url.replace(/\/{2,}/g, "/"); // // -> /
  next();
});


// Logger simple
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Mapeo slug -> nombre servicio (coincide con frontend)
const SERVICE_NAME_BY_SLUG: Record<string, string> = {
  "completo": "Servicio Completo",
  "bano-basico": "Baño Básico",
  "bano-premium": "Baño Sanitario",
  "corte-pelo": "Corte de pelo",
  "corte-uña": "Corte de uñas",
};

/* === CLIENTES === */
app.get("/", (_req, res) => {
  res.send("🚀 Backend funcionando correctamente - Prisma + Express");
});

app.get("/clientes", async (_req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({ include: { Mascotas: true } });
    res.json(clientes);
  } catch (error) {
    console.error("GET /clientes error:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

app.post("/clientes", async (req, res) => {
  try {
    const { Nombre, Telefono } = req.body;
    const cliente = await prisma.cliente.create({ data: { Nombre, Telefono } });
    res.json(cliente);
  } catch (error) {
    console.error("POST /clientes error:", error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
});

/* === MASCOTAS === */
app.get("/mascotas", async (_req, res) => {
  try {
    const mascotas = await prisma.mascota.findMany({ include: { Cliente: true } });
    res.json(mascotas);
  } catch (error) {
    console.error("GET /mascotas error:", error);
    res.status(500).json({ error: "Error al obtener mascotas" });
  }
});

app.post("/mascotas", async (req, res) => {
  try {
    const { Nombre, Tamano, ID_Cliente } = req.body;
    const mascota = await prisma.mascota.create({
      data: { Nombre, Tamano, ID_Cliente },
    });
    res.json(mascota);
  } catch (error) {
    console.error("POST /mascotas error:", error);
    res.status(500).json({ error: "Error al crear mascota" });
  }
});

/* === SERVICIOS === */
app.get("/servicios", async (_req, res) => {
  try {
    const servicios = await prisma.servicio.findMany();
    res.json(servicios);
  } catch (error) {
    console.error("GET /servicios error:", error);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

app.post("/servicios", async (req, res) => {
  try {
    const { Nombre_Servicio, Costo = 0, Duracion_Estimada = 60 } = req.body;
    const servicio = await prisma.servicio.create({
      data: { Nombre_Servicio, Costo: Number(Costo), Duracion_Estimada: Number(Duracion_Estimada) },
    });
    res.json(servicio);
  } catch (error) {
    console.error("POST /servicios error:", error);
    res.status(500).json({ error: "Error al crear servicio" });
  }
});

/* === CITAS === */
// Listar citas con relaciones (incluye Cliente dentro de Mascota)
app.get("/citas", async (_req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: { Mascota: { include: { Cliente: true } }, Servicio: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(citas);
  } catch (error) {
    console.error("GET /citas error:", error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
});

/**
 * POST /citas
 * Soporta:
 * - Payload con IDs: { Fecha, Hora, Notas_Adicionales, Estado, ID_Mascota, ID_Servicio }
 * - Payload "amigable": { ownerName, petName, phone, petSize, service (slug), date, time, notes }
 */
app.post("/citas", async (req, res) => {
  const body = req.body;

  try {
    // Modo directo si vienen IDs
    if (body.ID_Mascota && body.ID_Servicio) {
      const { Fecha, Hora, Notas_Adicionales, Estado, ID_Mascota, ID_Servicio } = body;
      const fechaIso = new Date(Fecha).toISOString();
      const horaIso = Hora && Hora.includes("T")
        ? new Date(Hora).toISOString()
        : new Date(`${Fecha}T${Hora}:00`).toISOString();

      const cita = await prisma.cita.create({
        data: {
          Fecha: fechaIso,
          Hora: horaIso,
          Notas_Adicionales: Notas_Adicionales ?? null,
          Estado: Estado ?? "pendiente",
          ID_Mascota: Number(ID_Mascota),
          ID_Servicio: Number(ID_Servicio),
        },
      });
      return res.json(cita);
    }

    // Modo amigable (desde PanelAdmin)
    const {
      ownerName,
      petName,
      phone,
      petSize,
      service, // slug
      date, // yyyy-mm-dd
      time, // HH:mm
      notes,
    } = body;

    if (!ownerName || !petName || !phone || !service || !date || !time) {
      return res.status(400).json({ error: "Faltan campos requeridos (ownerName, petName, phone, service, date, time)." });
    }

    // Buscar cliente por teléfono (findFirst para evitar problemas si Telefono no es unique en schema)
    let cliente = await prisma.cliente.findFirst({ where: { Telefono: String(phone) } });
    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: { Nombre: ownerName, Telefono: String(phone) },
      });
    }

    // Crear mascota vinculada al cliente
    const mascota = await prisma.mascota.create({
      data: {
        Nombre: petName,
        Tamano: petSize ?? "",
        ID_Cliente: cliente.ID_Cliente,
      },
    });

    // Buscar o crear servicio por nombre mapeado desde slug
    const wantedName = SERVICE_NAME_BY_SLUG[String(service)] ?? String(service);
    let servicio = await prisma.servicio.findFirst({ where: { Nombre_Servicio: wantedName } });
    if (!servicio) {
      servicio = await prisma.servicio.create({
        data: { Nombre_Servicio: wantedName, Costo: 0, Duracion_Estimada: 60 },
      });
    }

    // Construir ISO para Fecha y Hora
    const fechaIso = new Date(date).toISOString();
    const horaIso = new Date(`${date}T${time}:00`).toISOString();

    const nuevaCita = await prisma.cita.create({
      data: {
        Fecha: fechaIso,
        Hora: horaIso,
        Notas_Adicionales: notes ?? null,
        Estado: "pendiente",
        ID_Mascota: mascota.ID_Mascota,
        ID_Servicio: servicio.ID_Servicio,
      },
    });

    res.json(nuevaCita);
  } catch (error) {
    console.error("POST /citas error:", error);
    res.status(500).json({ error: "Error creando cita", details: String(error) });
  }
});

/**
 * PUT /citas/:id
 * Actualiza Fecha/Hora/Notas/Estado/Servicio.
 * Acepta date/time o Fecha/Hora; acepta ID_Servicio o service (slug).
 */
app.put("/citas/:id", async (req, res) => {
  const idRaw = req.params.id;
  const id = Number(idRaw);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID de cita inválido" });
  }

  try {
    const {
      Fecha,
      Hora,
      date,
      time,
      Notas_Adicionales,
      notes,
      Estado,
      ID_Servicio,
      service, // slug
    } = req.body;

    const updateData: any = {};

    // Manejo Fecha
    if (Fecha) updateData.Fecha = new Date(Fecha).toISOString();
    else if (date) updateData.Fecha = new Date(date).toISOString();

    // Manejo Hora
    if (Hora) {
      updateData.Hora = Hora.includes("T") ? new Date(Hora).toISOString() : new Date(`${Fecha ?? date}T${Hora}:00`).toISOString();
    } else if (time) {
      // Necesitamos una fecha base: si viene en body la usamos, si no, consultamos la cita existente
      let baseDate = date;
      if (!baseDate) {
        const existing = await prisma.cita.findUnique({ where: { ID_Cita: id } as any });
        if (existing && existing.Fecha) baseDate = new Date(existing.Fecha).toISOString().slice(0, 10);
      }
      const base = baseDate ?? new Date().toISOString().slice(0, 10);
      updateData.Hora = new Date(`${base}T${time}:00`).toISOString();
    }

    if (Notas_Adicionales !== undefined) updateData.Notas_Adicionales = Notas_Adicionales;
    else if (notes !== undefined) updateData.Notas_Adicionales = notes;

    if (Estado !== undefined) updateData.Estado = Estado;

    if (ID_Servicio) {
      updateData.ID_Servicio = Number(ID_Servicio);
    } else if (service) {
      const wantedName = SERVICE_NAME_BY_SLUG[String(service)] ?? String(service);
      let servicio = await prisma.servicio.findFirst({ where: { Nombre_Servicio: wantedName } });
      if (!servicio) {
        servicio = await prisma.servicio.create({ data: { Nombre_Servicio: wantedName, Costo: 0, Duracion_Estimada: 60 } });
      }
      updateData.ID_Servicio = servicio.ID_Servicio;
    }

    const updated = await prisma.cita.update({
      where: { ID_Cita: id },
      data: updateData,
    });

    res.json(updated);
  } catch (error) {
    console.error("PUT /citas/:id error:", error);
    res.status(500).json({ error: "Error actualizando cita", details: String(error) });
  }
});

/**
 * DELETE /citas/:id
 */
app.delete("/citas/:id", async (req, res) => {
  const idRaw = req.params.id;
  const id = Number(idRaw);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID de cita inválido" });
  }

  try {
    await prisma.cita.delete({ where: { ID_Cita: id } });
    res.status(204).send();
  } catch (error) {
    console.error("DELETE /citas/:id error:", error);
    res.status(500).json({ error: "Error eliminando cita", details: String(error) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

app.get("/horas-disponibles", async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: "Falta parámetro 'fecha'" });

  // Horas base del día
  const todasLasHoras = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

  // Buscar citas ya agendadas en esa fecha
  const citas = await prisma.cita.findMany({
    where: {
      Fecha: {
        gte: new Date(`${fecha}T00:00:00Z`),
        lt: new Date(`${fecha}T23:59:59Z`)
      }
    },
  });

  // Obtener las horas ya ocupadas
  const ocupadas = citas.map(c => {
    const hora = new Date(c.Hora);
    const hh = String(hora.getHours()).padStart(2, "0");
    const mm = String(hora.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  });

  // Filtrar disponibles
  const disponibles = todasLasHoras.filter(h => !ocupadas.includes(h));

  res.json(disponibles);
});
