import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SimpleNavigator, useNavigation } from './src/navigation/SimpleNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainApp from './src/navigation/MainApp';

function AppContent() {
  const { currentScreen, isLoading, isAuthenticated } = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Si l'utilisateur est authentifié, afficher l'application principale
  if (isAuthenticated) {
    return (
      <>
        <MainApp />
        <StatusBar style="auto" />
      </>
    );
  }

  // Sinon, afficher les écrans d'authentification
  return (
    <>
      {currentScreen === 'Onboarding' && <OnboardingScreen />}
      {currentScreen === 'Login' && <LoginScreen />}
      {currentScreen === 'SignUp' && <SignUpScreen />}
      <StatusBar style="auto" />
    </>
  );
}

export default function App() {
  return (
    <SimpleNavigator>
      <AppContent />
    </SimpleNavigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
