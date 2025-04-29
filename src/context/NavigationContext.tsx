'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  showNavbar: boolean;
  setShowNavbar: (show: boolean) => void;
  showBubbles: boolean;
  setShowBubbles: (show: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showBubbles, setShowBubbles] = useState(true);

  return (
    <NavigationContext.Provider value={{ 
      showNavbar, 
      setShowNavbar,
      showBubbles,
      setShowBubbles 
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
} 