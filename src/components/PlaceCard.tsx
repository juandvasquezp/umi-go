import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PlaceCardProps {
  name: string;
  rating: number;
  category: string;
  distance: string;
  imageUrl: string;
  address: string;
  onClick?: () => void;
}

export function PlaceCard({ name, rating, category, distance, imageUrl, address, onClick }: PlaceCardProps) {
  return (
    <Card 
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs">{rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="line-clamp-1">{name}</h3>
            <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded-full">
              {distance}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">{category}</p>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}