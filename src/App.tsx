import { useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { PlacesPage } from "./components/PlacesPage";
import { MapPage } from "./components/MapPage";
import { PeoplePage } from "./components/PeoplePage";
import { ProfilePage } from "./components/ProfilePage";
import UniGoWatermark from "./assets/UniGoWatermark_transparent.png";

export default function App() {
  const [activeTab, setActiveTab] = useState("places");

  const renderPage = () => {
    switch (activeTab) {
      case "places":
        return <PlacesPage />;
      case "map":
        return <MapPage />;
      case "people":
        return <PeoplePage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <PlacesPage />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto border-x border-border">
      {/* Header */}
      <header>
        <div className="flex items-center justify-center p-4 bg-white border-b border-border">
          <img src={UniGoWatermark} alt="Campus Connect" className="h-17" />
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 overflow-hidden pb-16">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}