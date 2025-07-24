import { useState } from "react";
import { ArrowLeft, Star, Phone, Clock, MapPin, MessageSquare, Share } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import appData from '../../data/appData.json'; // Ajusta la ruta si es necesario

interface PlaceDetailPageProps {
  placeId: number;
  onBack: () => void;
}

export function PlaceDetailPage({ placeId, onBack }: PlaceDetailPageProps) {
  const [userRating, setUserRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(
    appData.places.find(p => p.id === placeId)?.comments || []
  );

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