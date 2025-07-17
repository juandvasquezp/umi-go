import { PlaceCard } from "./PlaceCard";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

const mockPlaces = [
  {
    id: 1,
    name: "Central Library",
    rating: 4.5,
    category: "Study Space",
    distance: "0.3 mi",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    address: "123 University Ave"
  },
  {
    id: 2,
    name: "Campus Coffee Co.",
    rating: 4.7,
    category: "Coffee Shop",
    distance: "0.1 mi",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    address: "456 College St"
  },
  {
    id: 3,
    name: "Student Rec Center",
    rating: 4.3,
    category: "Fitness",
    distance: "0.5 mi",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    address: "789 Campus Dr"
  },
  {
    id: 4,
    name: "Pizza Palace",
    rating: 4.2,
    category: "Restaurant",
    distance: "0.8 mi",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    address: "321 Main St"
  },
  {
    id: 5,
    name: "The Bookstore",
    rating: 4.1,
    category: "Shopping",
    distance: "0.4 mi",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    address: "654 University Blvd"
  },
  {
    id: 6,
    name: "City Park",
    rating: 4.6,
    category: "Recreation",
    distance: "1.2 mi",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    address: "987 Park Ave"
  }
];

export function PlacesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPlaces = mockPlaces.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-border">
        <SearchBar
          placeholder="Busca lugares..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2 mb-4">
          <h2>Descubrir Lugares</h2>
          <p className="text-muted-foreground">Encuentra los mejores lugares alrededor del campus y la ciudad</p>
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
            />
          ))}
        </div>
        
        {filteredPlaces.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No places found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}