import { useState, useEffect } from "react";

const FIRST_VISIT_KEY = "campus-connect-first-visit";

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);
    setIsFirstVisit(!hasVisited);
  }, []);

  const markAsVisited = () => {
    localStorage.setItem(FIRST_VISIT_KEY, "true");
    setIsFirstVisit(false);
  };

  return {
    isFirstVisit,
    markAsVisited
  };
}