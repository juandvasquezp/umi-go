import { Settings, Edit, Star, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const currentUser = {
  id: 100,
  name: "Juan Pérez",
  major: "Ciencias de la Computación",
  year: "Primer Año",
  interests: ["Tecnología", "Gaming", "Café", "Grupos de Estudio", "Baloncesto", "Películas"],
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Nuevo estudiante emocionado por conocer gente y explorar la ciudad.",
  university: "Universidad de Tecnología",
  stats: {
    placesVisited: 12,
    connections: 8,
    averageRating: 4.7
  }
};

export function ProfilePage() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <h2>Perfil</h2>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3>{currentUser.name}</h3>
                <p className="text-muted-foreground">{currentUser.major} • {currentUser.year}</p>
                <p className="text-sm text-muted-foreground mt-1">{currentUser.university}</p>
                
                <Button variant="outline" size="sm" className="mt-3">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg">{currentUser.stats.placesVisited}</div>
              <div className="text-xs text-muted-foreground">Lugares Visitados</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg">{currentUser.stats.connections}</div>
              <div className="text-xs text-muted-foreground">Conexiones</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg">{currentUser.stats.averageRating}</div>
              <div className="text-xs text-muted-foreground">Calificación Prom.</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Interests */}
        <Card>
          <CardContent className="p-4">
            <h4 className="mb-3">Intereses</h4>
            <div className="flex flex-wrap gap-2">
              {currentUser.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardContent className="p-4">
            <h4 className="mb-3">Acerca de mí</h4>
            <p className="text-muted-foreground">{currentUser.bio}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}