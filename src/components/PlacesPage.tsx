import { PlaceCard } from "./PlaceCard";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

const mockPlaces = [
  {
    id: 1,
    name: "Biblioteca Central",
    rating: 4.5,
    category: "Espacio de Estudio",
    distance: "0.3 km",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    address: "Av. Universidad 123"
  },
  {
    id: 2,
    name: "Campus Coffee Co.",
    rating: 4.7,
    category: "Cafetería",
    distance: "0.1 km",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    address: "Calle Universitaria 456"
  },
  {
    id: 3,
    name: "Centro Recreativo Estudiantil",
    rating: 4.3,
    category: "Gimnasio",
    distance: "0.5 km",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    address: "Campus Dr. 789"
  },
  {
    id: 4,
    name: "Pizza Palace",
    rating: 4.2,
    category: "Restaurante",
    distance: "0.8 km",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    address: "Calle Principal 321"
  },
  {
    id: 5,
    name: "La Librería",
    rating: 4.1,
    category: "Compras",
    distance: "0.4 km",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    address: "Blvd. Universitario 654"
  },
  {
    id: 6,
    name: "Parque de la Ciudad",
    rating: 4.6,
    category: "Recreación",
    distance: "1.2 km",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    address: "Av. del Parque 987"
  }
];

interface PlacesPageProps {
  onPlaceSelect: (placeId: number) => void;
}

export function PlacesPage({ onPlaceSelect }: PlacesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPlaces = mockPlaces.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-border">
        <SearchBar
          placeholder="Buscar lugares..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2 mb-4">
          <h2>Descubre Lugares</h2>
          <p className="text-muted-foreground">Encuentra los mejores lugares del campus y la ciudad</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              name={place.name}
              rating={place.rating}
              category={place.category}
              distance={place.distance}
              imageUrl={place.imageUrl}
              address={place.address}
              onClick={() => onPlaceSelect(place.id)}
            />
          ))}
        </div>
        
        {filteredPlaces.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No se encontraron lugares que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}