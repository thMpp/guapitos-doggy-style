// Agendar

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";

/* ======== CONFIG BACKEND ======== */
const API_BASE = "http://localhost:3000"; // tu backend Express






// Mapeo del "slug" del select a cómo se guarda el servicio en BD
const SERVICE_NAME_BY_SLUG: Record<string, string> = {
  "completo": "Servicio Completo",
  "bano-basico": "Baño Básico",
  "bano-premium": "Baño Sanitario",
  "corte-pelo": "Corte de pelo",
  "corte-uña": "Corte de uñas",
};

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Error ${res.status}`);
  }
  return res.json();
}
/* ================================= */

const bookingSchema = z.object({
  ownerName: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre debe tener menos de 100 caracteres"),
  petName: z.string().trim().min(1, "El nombre de la mascota es requerido").max(50, "El nombre debe tener menos de 50 caracteres"),
  phone: z.string().trim().min(8, "El teléfono debe tener al menos 8 dígitos").max(15, "El teléfono debe tener menos de 15 dígitos"),
  petSize: z.string().min(1, "Selecciona el tamaño de tu mascota"),
  service: z.string().min(1, "Selecciona un servicio"),
  date: z.string().min(1, "Selecciona una fecha"),
  time: z.string().min(1, "Selecciona una hora"),
  notes: z.string().max(500, "Las notas deben tener menos de 500 caracteres").optional()
});

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    phone: "",
    petSize: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  /* ======== Desplegar horas disponibles ======== */
  const fetchAvailableTimes = async (selectedDate: string) => {
    try {
      const res = await fetch(`${API_BASE}/horas-disponibles?fecha=${selectedDate}`);
      if (!res.ok) throw new Error(await res.text());
      const horas = await res.json();
      setAvailableTimes(horas);
    } catch (err) {
      console.error("Error al cargar horas:", err);
      setAvailableTimes([]); // limpia si falla
    }
  };

  if (field === "date") {
    fetchAvailableTimes(value); // 🔹 carga horas para esa fecha
    setFormData(prev => ({ ...prev, time: "" })); // limpia hora previa
  }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = bookingSchema.parse(formData);

      /* ===== 1) CLIENTE: buscar por teléfono; si no existe, crear ===== */
      const clientes = await api<any[]>("/clientes"); // [{ ID_Cliente, Nombre, Telefono, ... }]
      let cliente = clientes.find(c => String(c.Telefono).trim() === validated.phone.trim());

      if (!cliente) {
        cliente = await api("/clientes", {
          method: "POST",
          body: JSON.stringify({
            Nombre: validated.ownerName,
            Telefono: validated.phone,
            // Si agregas Email en el modelo, envíalo aquí
          }),
        });
      }

      /* ===== 2) MASCOTA: crear con referencia a cliente ===== */
      const mascota: any = await api("/mascotas", {
        method: "POST",
        body: JSON.stringify({
          Nombre: validated.petName,
          Tamano: validated.petSize,
          ID_Cliente: cliente.ID_Cliente,
        }),
      });

      /* ===== 3) SERVICIO: buscar o crear ===== */
      const servicios: any[] = await api("/servicios");
      const wantedName = SERVICE_NAME_BY_SLUG[validated.service];
      let servicio: any = servicios.find((s) => s.Nombre_Servicio === wantedName);

      if (!servicio) {
        servicio = await api("/servicios", {
          method: "POST",
          body: JSON.stringify({
            Nombre_Servicio: wantedName,
            Costo: 0,
            Duracion_Estimada: 60,
          }),
        });
      }

      /* ===== 4) CITA: crear ===== */
      await api("/citas", {
        method: "POST",
        body: JSON.stringify({
          Fecha: validated.date,
          Hora: validated.time,
          Notas_Adicionales: validated.notes || "",
          Estado: "pendiente",
          ID_Mascota: mascota.ID_Mascota,      // ✅ ahora sí existe
          ID_Servicio: servicio.ID_Servicio,   // ✅ también
        }),
      });


      toast({
        title: "¡Cita agendada exitosamente!",
        description: `Hola ${validated.ownerName}, hemos recibido tu solicitud para ${validated.petName}. Te contactaremos pronto para confirmar.`,
      });

      // Reset form
      setFormData({
        ownerName: "",
        petName: "",
        phone: "",
        petSize: "",
        service: "",
        date: "",
        time: "",
        notes: ""
      });
    } catch (error: any) {
      const message =
        error instanceof z.ZodError
          ? error.issues[0]?.message
          : error?.message || "Hubo un problema al enviar tu solicitud. Por favor intenta nuevamente.";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="agendar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Agenda tu <span className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] bg-clip-text text-transparent">Cita</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-card border-0 bg-gradient-soft">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ownerName" className="text-foreground font-medium">Tu Nombre *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="Ej: María González"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petName" className="text-foreground font-medium">Nombre de tu Mascota *</Label>
                  <Input
                    id="petName"
                    value={formData.petName}
                    onChange={(e) => handleInputChange('petName', e.target.value)}
                    placeholder="Ej: Max"
                    className="bg-background border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">Teléfono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Ej: +56 9 1234 5678"
                  className="bg-background border-border"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Tamaño de la Mascota *</Label>
                  <Select value={formData.petSize} onValueChange={(value) => handleInputChange('petSize', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pequeno">Pequeño (hasta 5kg)</SelectItem>
                      <SelectItem value="mediano">Mediano (6-10kg)</SelectItem>
                      <SelectItem value="grande">Grande (10kg+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Servicio *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completo">Servicio Completo</SelectItem>
                      <SelectItem value="bano-basico">Baño Básico</SelectItem>
                      <SelectItem value="bano-premium">Baño Sanitario</SelectItem>
                      <SelectItem value="corte-pelo">Corte de pelo</SelectItem>
                      <SelectItem value="corte-uña">Corte de uñas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground font-medium">Fecha Preferida *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="bg-background border-border"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Hora Preferida *</Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)} disabled={availableTimes.length === 0}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder={availableTimes.length ? "Selecciona una hora" : "Selecciona primero la fecha"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.length > 0 ? (
                        availableTimes.map((hora) => (
                          <SelectItem key={hora} value={hora}>
                            {hora} {parseInt(hora.split(":")[0]) < 12 ? "AM" : "PM"}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="-" disabled>
                          Sin horas disponibles
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground font-medium">Notas Adicionales</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Cuéntanos sobre las necesidades especiales de tu mascota..."
                  className="bg-background border-border resize-none"
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-opacity text-lg py-6"
              >
                {isSubmitting ? "Enviando..." : "Agendar Cita"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
