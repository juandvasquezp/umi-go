import { useState } from "react";
import { ArrowLeft, Star, Phone, Clock, MapPin, MessageSquare, Share } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Importar datos directamente como objeto JavaScript
const appData = {
  "places": [
    {
      "id": 1,
      "name": "Biblioteca Central",
      "rating": 4.5,
      "category": "Espacio de Estudio",
      "distance": "0.3 km",
      "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      "address": "Av. Universidad 123",
      "description": "Una biblioteca moderna con amplios espacios de estudio, salas silenciosas y recursos digitales. Perfecta para estudiar individualmente o en grupo. Cuenta con WiFi gratuito y estaciones de carga.",
      "features": ["WiFi Gratis", "Salas Silenciosas", "Recursos Digitales", "Estaciones de Carga"],
      "hours": "Lunes a Viernes: 7:00 AM - 11:00 PM\nSábados: 9:00 AM - 9:00 PM\nDomingos: 10:00 AM - 8:00 PM",
      "phone": "+1 234-567-8900",
      "coordinates": { "lat": 40.7829, "lng": -73.9654 },
      "comments": [
        {
          "id": 1,
          "userId": 2,
          "userName": "Mike Chen",
          "userAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          "rating": 5,
          "comment": "Excelente lugar para estudiar. Muy silencioso y bien equipado.",
          "date": "2024-01-15"
        },
        {
          "id": 2,
          "userId": 3,
          "userName": "Emma Wilson",
          "userAvatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          "rating": 4,
          "comment": "Me encanta venir aquí entre clases. Siempre encuentro mesa.",
          "date": "2024-01-12"
        }
      ]
    },
    {
      "id": 2,
      "name": "Campus Coffee Co.",
      "rating": 4.7,
      "category": "Cafetería",
      "distance": "0.1 km",
      "imageUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      "address": "Calle Universitaria 456",
      "description": "La cafetería favorita de los estudiantes. Sirve café de especialidad, bebidas frías y snacks saludables. Ambiente acogedor perfecto para estudiar o socializar.",
      "features": ["Café de Especialidad", "WiFi Gratis", "Snacks Saludables", "Ambiente Acogedor"],
      "hours": "Lunes a Viernes: 6:30 AM - 10:00 PM\nSábados: 8:00 AM - 10:00 PM\nDomingos: 9:00 AM - 9:00 PM",
      "phone": "+1 234-567-8901",
      "coordinates": { "lat": 40.7831, "lng": -73.9652 },
      "comments": [
        {
          "id": 3,
          "userId": 1,
          "userName": "Sarah Johnson",
          "userAvatar": "https://images.unsplash.com/photo-1494790108755-2616b612b692?w=150&h=150&fit=crop&crop=face",
          "rating": 5,
          "comment": "¡El mejor café del campus! Los lattes son increíbles.",
          "date": "2024-01-14"
        }
      ]
    },
    {
      "id": 3,
      "name": "Centro Recreativo Estudiantil",
      "rating": 4.3,
      "category": "Gimnasio",
      "distance": "0.5 km",
      "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "address": "Campus Dr. 789",
      "description": "Moderno centro de fitness con equipos de última generación, piscina olímpica, canchas deportivas y clases grupales. Membresía gratuita para estudiantes.",
      "features": ["Equipos Modernos", "Piscina Olímpica", "Canchas Deportivas", "Clases Grupales"],
      "hours": "Lunes a Viernes: 5:00 AM - 11:00 PM\nFines de Semana: 7:00 AM - 10:00 PM",
      "phone": "+1 234-567-8902",
      "coordinates": { "lat": 40.7825, "lng": -73.9658 },
      "comments": [
        {
          "id": 4,
          "userId": 2,
          "userName": "Mike Chen",
          "userAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          "rating": 4,
          "comment": "Excelentes instalaciones. La piscina es mi favorita.",
          "date": "2024-01-10"
        }
      ]
    },
    {
      "id": 4,
      "name": "Pizza Palace",
      "rating": 4.2,
      "category": "Restaurante",
      "distance": "0.8 km",
      "imageUrl": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      "address": "Calle Principal 321",
      "description": "Auténtica pizzería italiana con recetas familiares. Perfecta para cenas grupales de estudiantes. Ofrecen descuentos especiales para universitarios.",
      "features": ["Recetas Auténticas", "Descuentos Estudiantiles", "Entrega a Domicilio", "Ambiente Familiar"],
      "hours": "Lunes a Jueves: 11:00 AM - 11:00 PM\nViernes a Domingo: 11:00 AM - 12:00 AM",
      "phone": "+1 234-567-8903",
      "coordinates": { "lat": 40.7820, "lng": -73.9665 },
      "comments": []
    },
    {
      "id": 5,
      "name": "La Librería",
      "rating": 4.1,
      "category": "Compras",
      "distance": "0.4 km",
      "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      "address": "Blvd. Universitario 654",
      "description": "Librería independiente con una amplia selección de libros académicos, literatura y material de papelería. También cuenta con una pequeña sección de café.",
      "features": ["Libros Académicos", "Literatura Variada", "Papelería", "Rincón de Café"],
      "hours": "Lunes a Sábado: 9:00 AM - 8:00 PM\nDomingos: 11:00 AM - 6:00 PM",
      "phone": "+1 234-567-8904",
      "coordinates": { "lat": 40.7835, "lng": -73.9648 },
      "comments": []
    },
    {
      "id": 6,
      "name": "Parque de la Ciudad",
      "rating": 4.6,
      "category": "Recreación",
      "distance": "1.2 km",
      "imageUrl": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      "address": "Av. del Parque 987",
      "description": "Hermoso parque urbano con senderos para caminar, áreas de picnic y espacios verdes para relajarse. Perfecto para tomar un descanso del estrés académico.",
      "features": ["Senderos para Caminar", "Áreas de Picnic", "Espacios Verdes", "Juegos Infantiles"],
      "hours": "Todos los días: 6:00 AM - 8:00 PM",
      "phone": "+1 234-567-8905",
      "coordinates": { "lat": 40.7815, "lng": -73.9670 },
      "comments": [
        {
          "id": 5,
          "userId": 3,
          "userName": "Emma Wilson",
          "userAvatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          "rating": 5,
          "comment": "Mi lugar favorito para relajarme después de los exámenes.",
          "date": "2024-01-08"
        }
      ]
    }
  ],
  "currentUser": {
    "id": 100,
    "name": "Juan Pérez",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
};

interface PlaceDetailPageProps {
  placeId: number;
  onBack: () => void;
}

export function PlaceDetailPage({ placeId, onBack }: PlaceDetailPageProps) {
  const [userRating, setUserRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(appData.places.find(p => p.id === placeId)?.comments || []);

  const place = appData.places.find(p => p.id === placeId);
  
  if (!place) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Lugar no encontrado</p>
      </div>
    );
  }

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && userRating > 0) {
      const comment = {
        id: comments.length + 1,
        userId: appData.currentUser.id,
        userName: appData.currentUser.name,
        userAvatar: appData.currentUser.avatar,
        rating: userRating,
        comment: newComment,
        date: new Date().toISOString().split('T')[0]
      };
      setComments([comment, ...comments]);
      setNewComment("");
      setUserRating(0);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-border">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="flex-1">{place.name}</h2>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Hero Image */}
        <div className="relative">
          <ImageWithFallback
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{place.rating}</span>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1>{place.name}</h1>
              <Badge variant="secondary">{place.distance}</Badge>
            </div>
            <p className="text-muted-foreground mb-2">{place.category}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{place.address}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2">Descripción</h3>
            <p className="text-muted-foreground">{place.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-2">Características</h3>
            <div className="flex flex-wrap gap-2">
              {place.features.map((feature, index) => (
                <Badge key={index} variant="outline">{feature}</Badge>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3>Información de Contacto</h3>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{place.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm">
                {place.hours.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Comment Section */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3">Agregar Comentario</h3>
              
              {/* Rating Stars */}
              <div className="mb-3">
                <p className="text-sm mb-2">Calificación:</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= userRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Input */}
              <Textarea
                placeholder="Escribe tu comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3"
              />
              
              <Button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || userRating === 0}
                className="w-full"
              >
                Publicar Comentario
              </Button>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5" />
              <h3>Comentarios ({comments.length})</h3>
            </div>
            
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No hay comentarios aún. ¡Sé el primero en comentar!
              </p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.userAvatar} />
                          <AvatarFallback>
                            {comment.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm">{comment.userName}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{comment.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {comment.comment}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}