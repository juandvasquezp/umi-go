import { Users, UserPlus, MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import appData from '../../data/appData.json';

const people = appData.people;

interface PeoplePageProps {
  onChatSelect: (userId: number) => void;
}

export function PeoplePage({ onChatSelect }: PeoplePageProps) {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="space-y-2 mb-6">
        <h2>Conecta con Estudiantes</h2>
        <p className="text-muted-foreground">Conoce compañeros estudiantes y haz nuevos amigos</p>
      </div>
      
      <div className="space-y-4">
        {people.map((person) => (
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
                      Conectar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onChatSelect(person.id)}
                    >
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