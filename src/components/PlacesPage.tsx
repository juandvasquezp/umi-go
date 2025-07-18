import { PlaceCard } from "./PlaceCard";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import appData from '../../data/appData.json';

const places = appData.places;

interface PlacesPageProps {
  onPlaceSelect: (placeId: number) => void;
}

export function PlacesPage({ onPlaceSelect }: PlacesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPlaces = places.filter(place =>
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