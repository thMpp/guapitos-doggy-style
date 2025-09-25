import { Shield, Heart, AlertTriangle, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnimalConsciousness = () => {
  return (
    <section id="conciencia" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Conciencia Animal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            En Guapitos creemos en el bienestar y respeto hacia nuestros amigos peludos. 
            Conoce nuestras prácticas éticas y cómo puedes contribuir al cuidado responsable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">Trabajo Sin Anestesia</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                En Guapitos trabajamos <strong>completamente sin anestesia</strong> para proteger 
                la salud de tu mascota. La anestesia puede causar complicaciones graves e incluso 
                la muerte en perros de edad avanzada o con problemas cardíacos no detectados. 
                Nuestro enfoque gentil y paciente garantiza la seguridad de tu peludo.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">Contra el Maltrato</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Rechazamos cualquier forma de maltrato animal. Cada perrito que llega a nosotros 
                recibe amor, paciencia y respeto. Utilizamos técnicas de manejo gentil y tomamos 
                el tiempo necesario para que tu mascota se sienta cómoda y segura durante todo el proceso.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-xl p-8 mb-12 border border-primary/10">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Consejos para el Cuidado Responsable
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-lg mb-2">Correas y Paseos</h4>
                <p className="text-muted-foreground text-sm">
                  Usa correas cómodas que no lastimen el cuello. Los collares de ahogo pueden 
                  causar daños en la tráquea. Prefiere arneses que distribuyan la presión 
                  de manera uniforme.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-lg mb-2">Alimentación Consciente</h4>
                <p className="text-muted-foreground text-sm">
                  Evita alimentos tóxicos como chocolate, cebolla y uvas. Mantén horarios 
                  regulares de alimentación y proporciona agua fresca siempre disponible.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-lg mb-2">Socialización Positiva</h4>
                <p className="text-muted-foreground text-sm">
                  Expón a tu mascota gradualmente a nuevas experiencias. La socialización 
                  temprana y positiva previene problemas de comportamiento futuros.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-lg mb-2">Cuidado Veterinario</h4>
                <p className="text-muted-foreground text-sm">
                  Mantén las vacunas al día y realiza chequeos regulares. La prevención 
                  es clave para detectar problemas de salud antes que se agraven.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="text-xl">Únete al Movimiento</CardTitle>
            </div>
            <CardDescription className="text-base">
              Ayúdanos a crear conciencia sobre el bienestar animal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Comparte información sobre el cuidado responsable de mascotas con tus amigos 
              y familia. Reporta casos de maltrato animal a las autoridades competentes. 
              Juntos podemos crear un mundo más seguro y amoroso para nuestros compañeros peludos.
            </p>
            <div className="bg-primary/10 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium text-primary">
                💡 Recuerda: Un animal feliz es un animal saludable. El amor y la paciencia 
                son las mejores herramientas de cualquier cuidador responsable.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AnimalConsciousness;