import { Users, UserPlus, MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const mockPeople = [
  {
    id: 1,
    name: "Sarah Johnson",
    major: "Computer Science",
    year: "Sophomore",
    interests: ["Gaming", "Coding", "Coffee"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b692?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    major: "Business",
    year: "Junior",
    interests: ["Basketball", "Photography", "Travel"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Wilson",
    major: "Art History",
    year: "Freshman",
    interests: ["Museums", "Reading", "Yoga"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

export function PeoplePage() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="space-y-2 mb-6">
        <h2>Conectar con Estudiantes</h2>
        <p className="text-muted-foreground">Conoce a otros estudiantes y haz nuevos amigos</p>
      </div>
      
      <div className="space-y-4">
        {mockPeople.map((person) => (
          <Card key={person.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4>{person.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {person.major} • {person.year}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {person.interests.map((interest) => (
                        <span
                          key={interest}
                          className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Solicitud
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Mensaje
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}