import { Settings, Edit, Star, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

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
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3>John Doe</h3>
                <p className="text-muted-foreground">Ciencias de la Computación • Primer Año</p>
                <p className="text-sm text-muted-foreground mt-1">Universidad de Tecnología</p>
                
                <Button variant="outline" size="sm" className="mt-3">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
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
              <div className="text-lg">12</div>
              <div className="text-xs text-muted-foreground">Lugares Visitados</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg">8</div>
              <div className="text-xs text-muted-foreground">Conexiones</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg">4.7</div>
              <div className="text-xs text-muted-foreground">Calificación Promedio</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Interests */}
        <Card>
          <CardContent className="p-4">
            <h4 className="mb-3">Intereses</h4>
            <div className="flex flex-wrap gap-2">
              {["Technology", "Gaming", "Coffee", "Study Groups", "Basketball", "Movies"].map((interest) => (
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
      </div>
    </div>
  );
}