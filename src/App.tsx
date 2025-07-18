import { useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { PlacesPage } from "./components/PlacesPage";
import { MapPage } from "./components/MapPage";
import { PeoplePage } from "./components/PeoplePage";
import { ProfilePage } from "./components/ProfilePage";
import { PlaceDetailPage } from "./components/PlaceDetailPage";
import { ChatPage } from "./components/ChatPage";
import { WelcomeTutorial } from "./components/WelcomeTutorial";
import { MascotHelper } from "./components/MascotHelper";
import { useFirstVisit } from "./components/hooks/useFirstVisit";
import UmiGoWatermark from "./assets/umigo-watermark.png";

type ViewType = 'places' | 'map' | 'people' | 'profile' | 'place-detail' | 'chat';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewType>("places");
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { isFirstVisit, markAsVisited } = useFirstVisit();

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

  const handleTutorialComplete = () => {
    markAsVisited();
  };

  const handleTutorialSkip = () => {
    markAsVisited();
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

  // Show loading while checking first visit status
  if (isFirstVisit === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando Campus Connect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto border-x border-border">
      {/* Header - Only show on main pages */}
      {showBottomNav && (
        <header>
          <div className="flex items-center justify-center p-4 bg-white border-b border-border">
            <img src={UmiGoWatermark} alt="Campus Connect" className="h-17" />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-hidden ${showBottomNav ? 'pb-16' : ''}`}>
        {renderPage()}
      </main>

      {/* Bottom Navigation - Only show on main pages */}
      {showBottomNav && (
        <BottomNavigation 
          activeTab={activeTab as string} 
          onTabChange={setActiveTab}
        />
      )}

      {/* Mascot Helper - Show after tutorial is completed and only on main pages */}
      {!isFirstVisit && showBottomNav && <MascotHelper />}

      {/* Welcome Tutorial - Show only on first visit */}
      {isFirstVisit && (
        <WelcomeTutorial
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
      )}
    </div>
  );
}