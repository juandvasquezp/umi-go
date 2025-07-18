import { MapPin, Navigation } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import appData from '../../data/appData.json';

const API_KEY = "AIzaSyDDf9BTahYSle-rGzHYa4ZdowfGGueUDOg";

export function MapPage() {
  const places = appData.places;
  return (
    <div className="flex flex-col h-full p-4">
      <div className="space-y-2 mb-6">
        <h2>Mapa del Campus</h2>
        <p className="text-muted-foreground">
          Navega por el campus y la ciudad
        </p>
      </div>

      <div className="flex-1 bg-accent rounded-lg flex flex-col items-center justify-center">
        <APIProvider apiKey={API_KEY}>
            <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{ lat: 4.6361342, lng: -74.0832243 }}
            defaultZoom={15}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={"c1b1a1b1b1b1b1b1"} // Reemplaza por tu mapId si tienes uno
            >
            {places.map((place) => (
              <AdvancedMarker
                key={place.id}
                position={place.coordinates}
                title={place.name}
              >
                <Pin background="#ff9500" borderColor="#cc7500" glyphColor="#fff" />
              </AdvancedMarker>
            ))}
            </Map>
        </APIProvider>
      </div>
    </div>
  );
}
