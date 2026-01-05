import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { resetOnboarding } from '../utils/onboarding';

/**
 * Écran de développement avec des outils utiles
 * À supprimer ou désactiver en production
 */
export default function DevScreen() {
  const handleResetOnboarding = async () => {
    await resetOnboarding();
    Alert.alert(
      'Onboarding réinitialisé',
      "L'onboarding sera affiché au prochain démarrage de l'application. Veuillez recharger l'app.",
      [
        {
          text: 'OK',
          onPress: () => {
            // Recharger l'application
            // Vous pouvez utiliser expo-updates ou simplement redémarrer manuellement
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outils de développement</Text>

      <TouchableOpacity style={styles.button} onPress={handleResetOnboarding}>
        <Text style={styles.buttonText}>Réinitialiser l'onboarding</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Note: Cet écran doit être supprimé ou désactivé en production
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    minWidth: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
});
