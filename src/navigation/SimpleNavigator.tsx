import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigation simple basée sur l'état (temporaire, en attendant React Navigation)
type AuthScreen = 'Onboarding' | 'Login' | 'SignUp';
type MainScreen = 'Home' | 'Events' | 'People' | 'Profile' | 'Admin';
type Screen = AuthScreen | MainScreen;

interface NavigationContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const NavigationContext = React.createContext<NavigationContextType>({
  currentScreen: 'Onboarding',
  navigate: () => {},
  isLoading: true,
  isAuthenticated: false,
});

export function useNavigation() {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

interface SimpleNavigatorProps {
  children: React.ReactNode;
}

const ONBOARDING_KEY = '@onboarding_completed';

export function SimpleNavigator({ children }: SimpleNavigatorProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Onboarding');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkInitialStatus();
  }, []);

  const checkInitialStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
      // Pour l'instant, on simule l'authentification
      // TODO: Implémenter une vraie logique d'authentification
      const authStatus = false; // À remplacer par une vraie vérification

      if (authStatus) {
        setIsAuthenticated(true);
        setCurrentScreen('Home');
      } else if (hasCompletedOnboarding === 'true') {
        setCurrentScreen('Login');
      } else {
        setCurrentScreen('Onboarding');
      }
    } catch (error) {
      console.error('Error checking initial status:', error);
      setCurrentScreen('Onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = async (screen: Screen) => {
    // Si on navigue depuis l'onboarding vers login, marquer l'onboarding comme complété
    if (currentScreen === 'Onboarding' && screen === 'Login') {
      try {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      } catch (error) {
        console.error('Error saving onboarding status:', error);
      }
    }

    // Si on navigue vers Home depuis Login/SignUp, marquer comme authentifié
    if ((currentScreen === 'Login' || currentScreen === 'SignUp') && screen === 'Home') {
      setIsAuthenticated(true);
    }

    setCurrentScreen(screen);
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate, isLoading, isAuthenticated }}>
      {children}
    </NavigationContext.Provider>
  );
}
