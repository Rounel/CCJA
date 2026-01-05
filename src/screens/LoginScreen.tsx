import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LoginCredentials, AuthProvider } from '../types/auth.types';
import { useNavigation } from '../navigation/SimpleNavigator';

export default function LoginScreen() {
  const { navigate } = useNavigation();
  const [authMethod, setAuthMethod] = useState<AuthProvider>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    // TODO: Implémenter la logique de connexion email/password
    // Pour l'instant, on simule une connexion réussie
    Alert.alert('Connexion réussie', 'Bienvenue!');
    navigate('Home');
  };

  const handleSendOTP = async () => {
    if (!phone) {
      Alert.alert('Erreur', 'Veuillez entrer votre numéro de téléphone');
      return;
    }
    // TODO: Implémenter l'envoi d'OTP via WhatsApp
    setOtpSent(true);
    Alert.alert('OTP Envoyé', 'Un code a été envoyé sur WhatsApp');
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Erreur', 'Veuillez entrer le code OTP');
      return;
    }
    // TODO: Implémenter la vérification de l'OTP
    Alert.alert('Connexion', 'Vérification du code OTP...');
  };

  const handleGoogleLogin = async () => {
    // TODO: Implémenter la connexion Google OAuth
    Alert.alert('Google', 'Connexion avec Google en cours...');
  };

  const handleLinkedInLogin = async () => {
    // TODO: Implémenter la connexion LinkedIn OAuth
    Alert.alert('LinkedIn', 'Connexion avec LinkedIn en cours...');
  };

  const renderEmailLogin = () => (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="votre@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleEmailLogin}>
        <Text style={styles.primaryButtonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPhoneLogin = () => (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Numéro de téléphone</Text>
      <TextInput
        style={styles.input}
        placeholder="+225 XX XX XX XX XX"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {!otpSent ? (
        <TouchableOpacity style={styles.primaryButton} onPress={handleSendOTP}>
          <Text style={styles.primaryButtonText}>Envoyer le code</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.label}>Code OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="XXXXXX"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyOTP}>
            <Text style={styles.primaryButtonText}>Vérifier le code</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Bienvenue sur l'application de gestion de communauté</Text>

        {/* Méthodes d'authentification */}
        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[styles.methodButton, authMethod === 'email' && styles.methodButtonActive]}
            onPress={() => {
              setAuthMethod('email');
              setOtpSent(false);
            }}
          >
            <Text style={[styles.methodButtonText, authMethod === 'email' && styles.methodButtonTextActive]}>
              Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.methodButton, authMethod === 'phone' && styles.methodButtonActive]}
            onPress={() => {
              setAuthMethod('phone');
              setOtpSent(false);
            }}
          >
            <Text style={[styles.methodButtonText, authMethod === 'phone' && styles.methodButtonTextActive]}>
              Téléphone
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulaire de connexion */}
        {authMethod === 'email' && renderEmailLogin()}
        {authMethod === 'phone' && renderPhoneLogin()}

        {/* Séparateur */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OU</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Connexions sociales */}
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Text style={styles.socialButtonText}>Continuer avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.linkedInButton]} onPress={handleLinkedInLogin}>
          <Text style={styles.socialButtonText}>Continuer avec LinkedIn</Text>
        </TouchableOpacity>

        {/* Lien vers inscription */}
        <TouchableOpacity onPress={() => navigate('SignUp')}>
          <Text style={styles.signUpLink}>
            Pas encore de compte ? <Text style={styles.signUpLinkBold}>S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  methodSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  methodButtonActive: {
    backgroundColor: '#007AFF',
  },
  methodButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  methodButtonTextActive: {
    color: '#fff',
  },
  formContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  linkedInButton: {
    backgroundColor: '#0077B5',
    borderColor: '#0077B5',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  signUpLink: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#666',
  },
  signUpLinkBold: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
