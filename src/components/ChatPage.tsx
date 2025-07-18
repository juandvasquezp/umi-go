import { useState } from "react";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const mockPeople = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b692?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

interface ChatPageProps {
  userId: number;
  onBack: () => void;
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export function ChatPage({ userId, onBack }: ChatPageProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: userId,
      text: "¡Hola! Vi que eres nuevo en el campus. ¿Te gustaría que te muestre algunos lugares geniales?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      senderId: 100, // Current user ID
      text: "¡Hola! Sí, me encantaría. Soy nuevo aquí y no conozco muchos lugares todavía.",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      senderId: userId,
      text: "Perfecto. ¿Has estado en Campus Coffee Co.? Tienen el mejor café y es un gran lugar para estudiar.",
      timestamp: "10:33 AM",
      isOwn: false
    },
    {
      id: 4,
      senderId: 100,
      text: "No, aún no he ido. ¿Podrías mostrarme dónde está?",
      timestamp: "10:35 AM",
      isOwn: true
    },
    {
      id: 5,
      senderId: userId,
      text: "¡Claro! ¿Qué tal si nos encontramos allí mañana a las 2 PM?",
      timestamp: "10:36 AM",
      isOwn: false
    }
  ]);

  const user = mockPeople.find(p => p.id === userId);
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Usuario no encontrado</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        senderId: 100, // Current user ID
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm">{user.name}</h3>
              <p className="text-xs text-muted-foreground">En línea</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end gap-2 max-w-[70%] ${
              message.isOwn ? 'flex-row-reverse' : 'flex-row'
            }`}>
              {!message.isOwn && (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`rounded-lg p-3 ${
                message.isOwn 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}