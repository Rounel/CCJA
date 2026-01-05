import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@onboarding_completed';

/**
 * Réinitialiser l'onboarding (utile pour le développement/test)
 * Appeler cette fonction pour forcer l'affichage de l'onboarding au prochain démarrage
 */
export const resetOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    console.log('Onboarding reset successfully');
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
};

/**
 * Vérifier si l'onboarding a été complété
 */
export const hasCompletedOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

/**
 * Marquer l'onboarding comme complété
 */
export const completeOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    console.log('Onboarding marked as completed');
  } catch (error) {
    console.error('Error completing onboarding:', error);
  }
};
