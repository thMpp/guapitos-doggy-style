import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Calendar, Clock, User, Dog, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  ownerName: string;
  petName: string;
  phone: string;
  email: string;
  petSize: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const PanelAdmin = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      ownerName: "María González",
      petName: "Max",
      phone: "+56 9 1234 5678",
      email: "maria@example.com",
      petSize: "mediano",
      service: "completo",
      date: "2025-10-28",
      time: "09:00",
      notes: "Max es un poco nervioso con las tijeras"
    },
    {
      id: "2",
      ownerName: "Carlos Rodríguez",
      petName: "Luna",
      phone: "+56 9 8765 4321",
      email: "carlos@example.com",
      petSize: "pequeno",
      service: "bano-basico",
      date: "2025-10-28",
      time: "10:00",
      notes: "Primera vez en peluquería"
    },
    {
      id: "3",
      ownerName: "Ana Silva",
      petName: "Rocky",
      phone: "+56 9 5555 6666",
      email: "ana@example.com",
      petSize: "grande",
      service: "corte-pelo",
      date: "2025-10-29",
      time: "11:00",
      notes: "Le gusta el corte estilo teddy bear"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBooking, setNewBooking] = useState<Omit<Booking, "id">>({
    ownerName: "",
    petName: "",
    phone: "",
    email: "",
    petSize: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const handleDelete = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    toast({
      title: "Cita eliminada",
      description: "La cita ha sido eliminada exitosamente",
    });
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (Math.max(...bookings.map(b => parseInt(b.id)), 0) + 1).toString();
    setBookings([...bookings, { ...newBooking, id: newId }]);
    setNewBooking({
      ownerName: "",
      petName: "",
      phone: "",
      email: "",
      petSize: "",
      service: "",
      date: "",
      time: "",
      notes: ""
    });
    setShowAddForm(false);
    toast({
      title: "Cita agregada",
      description: "La nueva cita ha sido agregada exitosamente",
    });
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">Gestiona todas las citas agendadas de Guapitos</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Citas Agendadas ({bookings.length})
          </h2>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Cita
          </Button>
        </div>

        {showAddForm && (
          <Card className="p-6 mb-6 border-primary/20 bg-card/95 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Nueva Cita</h3>
            <form onSubmit={handleAddBooking} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Nombre del Dueño *</Label>
                  <Input
                    id="ownerName"
                    value={newBooking.ownerName}
                    onChange={(e) => setNewBooking({ ...newBooking, ownerName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petName">Nombre de la Mascota *</Label>
                  <Input
                    id="petName"
                    value={newBooking.petName}
                    onChange={(e) => setNewBooking({ ...newBooking, petName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tamaño *</Label>
                  <Select value={newBooking.petSize} onValueChange={(value) => setNewBooking({ ...newBooking, petSize: value })}>
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
                <div className="space-y-2">
                  <Label>Servicio *</Label>
                  <Select value={newBooking.service} onValueChange={(value) => setNewBooking({ ...newBooking, service: value })}>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hora *</Label>
                  <Select value={newBooking.time} onValueChange={(value) => setNewBooking({ ...newBooking, time: value })}>
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
                <Textarea
                  id="notes"
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-primary to-accent">
                  Agregar Cita
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid gap-4">
          {bookings.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">No hay citas agendadas</p>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="p-6 border-primary/20 bg-card/95 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-lg text-foreground">{booking.ownerName}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Dog className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">Mascota:</span>
                        <span className="font-medium text-foreground">{booking.petName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">Tel:</span>
                        <span className="font-medium text-foreground">{booking.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">Fecha:</span>
                        <span className="font-medium text-foreground">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">Hora:</span>
                        <span className="font-medium text-foreground">{booking.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {getServiceLabel(booking.service)}
                      </span>
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                        {getSizeLabel(booking.petSize)}
                      </span>
                    </div>
                    {booking.notes && (
                      <div className="mt-2 p-3 bg-muted/50 rounded-md">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Notas:</span> {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(booking.id)}
                    className="lg:self-start"
                  >
                    <Trash2 className="w-4 h-4" />
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
