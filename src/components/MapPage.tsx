import { MapPin, Navigation } from "lucide-react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const API_KEY = "AIzaSyDDf9BTahYSle-rGzHYa4ZdowfGGueUDOg";

export function MapPage() {
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
            defaultZoom={16}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            >
            {Array.from({ length: 20 }).map((_, i) => {
              // Randomize within ~0.001 lat/lng of center
              const lat =
              4.6361342 + (Math.random() - 0.5) * 0.002;
              const lng =
              -74.0832243 + (Math.random() - 0.5) * 0.002;
              return (
              <Marker
                key={i}
                position={{ lat, lng }}
              />
              );
            })}
            </Map>
        </APIProvider>
      </div>
    </div>
  );
}
