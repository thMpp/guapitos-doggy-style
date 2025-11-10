import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash2, Plus, Calendar, Clock, User, Dog, Phone, Search, Filter, CalendarIcon, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const apiUrl = (path: string) => new URL(path, API_BASE).toString();

// De "Servicio Completo" → "completo", etc.
const serviceSlugFromName = (name: string) => {
  const map: Record<string, string> = {
    "Servicio Completo": "completo",
    "Baño Básico": "bano-basico",
    "Baño Sanitario": "bano-premium",
    "Corte de pelo": "corte-pelo",
    "Corte de uñas": "corte-uña",
  };
  return map[name] || name;
};

// Helper: ISO → "YYYY-MM-DD"
const toYMD = (iso: string) => new Date(iso).toISOString().slice(0, 10);

// Helper: ISO → "HH:mm"
const toHM = (iso: string) => {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

const safeId = (val: any) => {
  if (val != null) return String(val);
  // Fallback sin crypto:
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

interface Booking {
  id: string; // stringified ID_Cita when it exists
  ownerName: string;
  petName: string;
  phone: string;
  petSize: string;
  service: string; // slug like "completo"
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  notes: string;
}

// Mapea el objeto devuelto por Prisma a Booking
const mapPrismaToBooking = (c: any): Booking => {
  const mascota = c?.Mascota ?? {};
  const cliente = mascota?.Cliente ?? {};
  const servicio = c?.Servicio ?? {};

  return {
    id: safeId(c?.ID_Cita),
    ownerName: String(cliente?.Nombre ?? "(Dueño no registrado)"),
    petName: String(mascota?.Nombre ?? "Mascota"),
    phone: String(cliente?.Telefono ?? ""),
    petSize: String((mascota?.Tamano ?? "")).toLowerCase(),
    service: serviceSlugFromName(String(servicio?.Nombre_Servicio ?? "")),
    date: c?.Fecha ? toYMD(c.Fecha) : "",
    time: c?.Hora ? toHM(c.Hora) : "",
    notes: String(c?.Notas_Adicionales ?? ""),
  };
};

const initialFormData: Omit<Booking, "id"> = {
  ownerName: "",
  petName: "",
  phone: "",
  petSize: "",
  service: "",
  date: "",
  time: "",
  notes: ""
};

const PanelAdmin = () => {
  const { toast } = useToast();

  // ahora partimos vacío y cargamos desde backend
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form unificado (crear / editar)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Booking, "id">>(initialFormData);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null); // null = creando

  // Filtros y UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterService, setFilterService] = useState("todos");

  // Cargar citas desde backend (reemplaza datos previos)
  useEffect(() => {
    const loadRealBookings = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE}/citas`);
        if (!res.ok) throw new Error(await res.text());
        const citas = (await res.json()) as any[];

        const mapped: Booking[] = citas.map(mapPrismaToBooking);
        setBookings(mapped); // REEMPLAZAMOS datos
      } catch (err: any) {
        console.error("Error cargando /citas:", err);
        toast({
          title: "Error al cargar citas",
          description: String(err?.message || err),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadRealBookings();
  }, [toast]);

  // Filtrado (igual que antes)
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.phone.includes(searchQuery);

      const matchesDate = !filterDate || booking.date === format(filterDate, "yyyy-MM-dd");
      const matchesService = filterService === "todos" || booking.service === filterService;

      return matchesSearch && matchesDate && matchesService;
    });
  }, [bookings, searchQuery, filterDate, filterService]);

  // Abrir formulario para crear o editar
  const handleOpenForm = (booking: Booking | null = null) => {
    if (booking) {
      setEditingBooking(booking);
      setFormData({
        ownerName: booking.ownerName,
        petName: booking.petName,
        phone: booking.phone,
        petSize: booking.petSize,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        notes: booking.notes,
      });
    } else {
      setEditingBooking(null);
      setFormData(initialFormData);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBooking(null);
    setFormData(initialFormData);
  };

  // Crear cita (POST -> backend)
  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/citas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // payload "amigable" que acepta el backend
          ownerName: formData.ownerName,
          petName: formData.petName,
          phone: formData.phone,
          petSize: formData.petSize,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const created = await res.json();
      const mapped = mapPrismaToBooking(created);

      // Añadimos al inicio
      setBookings((prev) => [mapped, ...prev]);
      handleCloseForm();
      toast({ title: "Cita agregada", description: "La nueva cita ha sido agregada exitosamente" });
    } catch (err: any) {
      console.error("Error agregando cita:", err);
      toast({ title: "Error al agregar", description: String(err?.message || err), variant: "destructive" });
    }
  };

  // Actualizar cita (PUT -> backend)
  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    try {
      const id = editingBooking.id;
      const res = await fetch(`${API_BASE}/citas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // enviamos date/time y service (slug)
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          service: formData.service,
          // no intentamos modificar dueño/mascota/telefono en esta ruta
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      const mapped = mapPrismaToBooking(updated);

      setBookings((prev) => prev.map((b) => (b.id === mapped.id ? mapped : b)));
      handleCloseForm();
      toast({ title: "Cita actualizada", description: "La cita ha sido modificada exitosamente" });
    } catch (err: any) {
      console.error("Error actualizando cita:", err);
      toast({ title: "Error al actualizar", description: String(err?.message || err), variant: "destructive" });
    }
  };

  // Eliminar cita (DELETE -> backend) con optimistic UI
  const handleDelete = async (id: string) => {
    const original = [...bookings];
    setBookings((prev) => prev.filter((b) => b.id !== id));

    try {
      const res = await fetch(`${API_BASE}/citas/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Cita eliminada", description: "La cita ha sido eliminada exitosamente" });
    } catch (err: any) {
      console.error("Error eliminando cita:", err);
      setBookings(original);
      toast({ title: "Error al eliminar", description: String(err?.message || err), variant: "destructive" });
    }
  };

  // Handlers genéricos del formulario
  const handleFormChange = (field: keyof Omit<Booking, "id">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getServiceLabel = (service: string) => {
    const services: Record<string, string> = {
      "completo": "Servicio Completo",
      "bano-basico": "Baño Básico",
      "bano-premium": "Baño Sanitario",
      "corte-pelo": "Corte de pelo",
      "corte-uña": "Corte de uñas"
    };
    return services[service] || service;
  };

  const getSizeLabel = (size: string) => {
    const sizes: Record<string, string> = {
      "pequeno": "Pequeño",
      "mediano": "Mediano",
      "grande": "Grande"
    };
    return sizes[size] || size;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">
              <span className="inline-block w-fit bg-gradient-to-r from-[#ec82ae] via-[#b58bd0] to-[#81dcee] bg-clip-text text-transparent">
                Panel de Administración
              </span>
            </h1>
            <p className="text-muted-foreground">
              Gestiona todas las citas agendadas de Guapitos
            </p>
          </div>

          <Button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-all duration-300 hover:scale-[1.02] text-primary-foreground font-semibold"
          >
            Volver al inicio
          </Button>
        </div>

        {/* Búsqueda y filtros */}
        <Card className="p-6 mb-6 border-primary/20 bg-card/95 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar por nombre del dueño, mascota o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filtros:</span>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filterDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDate ? format(filterDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={filterDate}
                      onSelect={setFilterDate}
                      initialFocus
                      locale={es}
                    />
                    {filterDate && (
                      <div className="p-3 border-t">
                        <Button variant="ghost" className="w-full" onClick={() => setFilterDate(undefined)}>
                          Limpiar filtro
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los servicios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los servicios</SelectItem>
                    <SelectItem value="completo">Servicio Completo</SelectItem>
                    <SelectItem value="bano-basico">Baño Básico</SelectItem>
                    <SelectItem value="bano-premium">Baño Sanitario</SelectItem>
                    <SelectItem value="corte-pelo">Corte de pelo</SelectItem>
                    <SelectItem value="corte-uña">Corte de uñas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleOpenForm(null)} className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Cita
              </Button>
            </div>
          </div>
        </Card>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-foreground">Citas encontradas: {filteredBookings.length}</h2>
        </div>

        {/* Formulario de Agregar / Modificar Cita */}
        {isFormOpen && (
          <Card className="p-6 mb-6 border-primary/20 bg-card/95 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{editingBooking ? "Modificar Cita" : "Nueva Cita"}</h3>
            <form onSubmit={editingBooking ? handleUpdateBooking : handleAddBooking} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Nombre del Dueño *</Label>
                  <Input id="ownerName" value={formData.ownerName} onChange={(e) => handleFormChange("ownerName", e.target.value)} required disabled={!!editingBooking} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petName">Nombre de la Mascota *</Label>
                  <Input id="petName" value={formData.petName} onChange={(e) => handleFormChange("petName", e.target.value)} required disabled={!!editingBooking} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleFormChange("phone", e.target.value)} required disabled={!!editingBooking} />
                </div>
                <div className="space-y-2">
                  <Label>Tamaño *</Label>
                  <Select value={formData.petSize} onValueChange={(value) => handleFormChange("petSize", value)} disabled={!!editingBooking}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pequeno">Pequeño</SelectItem>
                      <SelectItem value="mediano">Mediano</SelectItem>
                      <SelectItem value="grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Servicio *</Label>
                <Select value={formData.service} onValueChange={(value) => handleFormChange("service", value)} required>
                  <SelectTrigger>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha *</Label>
                  <Input id="date" type="date" value={formData.date} onChange={(e) => handleFormChange("date", e.target.value)} min={new Date().toISOString().split("T")[0]} required />
                </div>
                <div className="space-y-2">
                  <Label>Hora *</Label>
                  <Select value={formData.time} onValueChange={(value) => handleFormChange("time", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea id="notes" value={formData.notes} onChange={(e) => handleFormChange("notes", e.target.value)} rows={3} />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc]">
                  {editingBooking ? "Guardar Cambios" : "Agregar Cita"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <Card className="p-12 text-center col-span-full">
              <p className="text-muted-foreground text-lg">Cargando citas...</p>
            </Card>
          ) : filteredBookings.length === 0 ? (
            <Card className="p-12 text-center col-span-full">
              <p className="text-muted-foreground text-lg">
                {searchQuery || filterDate || filterService !== "todos"
                  ? "No se encontraron citas con los filtros aplicados"
                  : "No hay citas agendadas"}
              </p>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-5 border-primary/20 bg-card/95 backdrop-blur-sm hover:shadow-lg transition-all hover:border-primary/40 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">{booking.ownerName}</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Confirmada
                  </span>
                </div>

                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Dog className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{booking.petName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{booking.phone}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: "#EC82AE1A", color: "#EC82AE" }}>
                      {getServiceLabel(booking.service)}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: "#74DBD41A", color: "#74DBD4" }}>
                      {getSizeLabel(booking.petSize)}
                    </span>
                  </div>

                  {booking.notes && (
                    <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Notas:</span> {booking.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenForm(booking)} className="flex-1 text-muted-foreground hover:text-[#3B82F6] hover:bg-[#3B82F6]/10">
                    <Pencil className="w-4 h-4 mr-2" />
                    Modificar
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(booking.id)} className="flex-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;