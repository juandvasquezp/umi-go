import { useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { PlacesPage } from "./components/PlacesPage";
import { MapPage } from "./components/MapPage";
import { PeoplePage } from "./components/PeoplePage";
import { ProfilePage } from "./components/ProfilePage";
import { PlaceDetailPage } from "./components/PlaceDetailPage";
import { ChatPage } from "./components/ChatPage";
import UniGoWatermark from "./assets/UniGoWatermark_transparent.png";

type ViewType = 'places' | 'map' | 'people' | 'profile' | 'place-detail' | 'chat';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewType>("places");
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handlePlaceSelect = (placeId: number) => {
    setSelectedPlaceId(placeId);
    setActiveTab('place-detail');
  };

  const handleChatSelect = (userId: number) => {
    setSelectedUserId(userId);
    setActiveTab('chat');
  };

  const handleBack = () => {
    if (activeTab === 'place-detail') {
      setActiveTab('places');
      setSelectedPlaceId(null);
    } else if (activeTab === 'chat') {
      setActiveTab('people');
      setSelectedUserId(null);
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case "places":
        return <PlacesPage onPlaceSelect={handlePlaceSelect} />;
      case "map":
        return <MapPage />;
      case "people":
        return <PeoplePage onChatSelect={handleChatSelect} />;
      case "profile":
        return <ProfilePage />;
      case "place-detail":
        return selectedPlaceId ? (
          <PlaceDetailPage placeId={selectedPlaceId} onBack={handleBack} />
        ) : null;
      case "chat":
        return selectedUserId ? (
          <ChatPage userId={selectedUserId} onBack={handleBack} />
        ) : null;
      default:
        return <PlacesPage onPlaceSelect={handlePlaceSelect} />;
    }
  };

  // Don't show bottom navigation on detail pages
  const showBottomNav = !['place-detail', 'chat'].includes(activeTab);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - Only show on main pages */}
      {showBottomNav && (
        <header>
          <div className="flex items-center justify-center p-4 bg-white border-b border-border">
            <img src={UniGoWatermark} alt="Campus Connect" className="h-17" />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-hidden ${showBottomNav ? 'pb-16' : ''}`}>
        {renderPage()}
      </main>

      {/* Bottom Navigation - Only show on main pages */}
      {showBottomNav && (
        <BottomNavigation activeTab={activeTab as string} onTabChange={setActiveTab} />
      )}
    </div>
  );
}