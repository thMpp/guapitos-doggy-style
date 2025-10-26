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

const bookingSchema = z.object({
  ownerName: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre debe tener menos de 100 caracteres"),
  petName: z.string().trim().min(1, "El nombre de la mascota es requerido").max(50, "El nombre debe tener menos de 50 caracteres"),
  phone: z.string().trim().min(8, "El teléfono debe tener al menos 8 dígitos").max(15, "El teléfono debe tener menos de 15 dígitos"),
  email: z.string().trim().email("Email inválido").max(255, "El email debe tener menos de 255 caracteres"),
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
    email: "",
    petSize: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = bookingSchema.parse(formData);
      
      // Simulamos el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Cita agendada exitosamente!",
        description: `Hola ${validatedData.ownerName}, hemos recibido tu solicitud para ${validatedData.petName}. Te contactaremos pronto para confirmar.`,
      });
      
      // Reset form
      setFormData({
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
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        toast({
          title: "Error en el formulario",
          description: firstError.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema al enviar tu solicitud. Por favor intenta nuevamente.",
          variant: "destructive"
        });
      }
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
                  <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent> {/* se debe consultar en la bd para ver los horarios disponibles del día*/}
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