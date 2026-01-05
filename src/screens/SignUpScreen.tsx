import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SignUpData } from '../types/auth.types';
import { useNavigation } from '../navigation/SimpleNavigator';

export default function SignUpScreen() {
  const { navigate } = useNavigation();
  const [formData, setFormData] = useState<SignUpData>({
    nom: '',
    prenoms: '',
    photo: '',
    numero: '',
    age: 0,
    situationProfessionnelle: '',
    domainesCompetence: [],
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [competenceInput, setCompetenceInput] = useState('');

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Nous avons besoin de votre permission pour accéder à vos photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images' as any,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photo: result.assets[0].uri });
    }
  };

  const handleAddCompetence = () => {
    if (competenceInput.trim()) {
      setFormData({
        ...formData,
        domainesCompetence: [...formData.domainesCompetence, competenceInput.trim()],
      });
      setCompetenceInput('');
    }
  };

  const handleRemoveCompetence = (index: number) => {
    const newCompetences = formData.domainesCompetence.filter((_, i) => i !== index);
    setFormData({ ...formData, domainesCompetence: newCompetences });
  };

  const handleSignUp = async () => {
    // Validation
    if (!formData.nom || !formData.prenoms || !formData.numero || !formData.age) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.email && formData.password) {
      if (formData.password !== confirmPassword) {
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
        return;
      }
      if (formData.password.length < 6) {
        Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
    }

    if (formData.age < 18) {
      Alert.alert('Erreur', 'Vous devez avoir au moins 18 ans');
      return;
    }

    // TODO: Implémenter l'inscription
    Alert.alert('Inscription', 'Inscription en cours...');
    console.log('Form data:', formData);
  };

  const handleGoogleSignUp = async () => {
    // TODO: Implémenter l'inscription via Google OAuth
    Alert.alert('Google', 'Inscription avec Google en cours...');
  };

  const handleLinkedInSignUp = async () => {
    // TODO: Implémenter l'inscription via LinkedIn OAuth
    Alert.alert('LinkedIn', 'Inscription avec LinkedIn en cours...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Inscription</Text>
        <Text style={styles.subtitle}>Créez votre compte pour rejoindre la communauté</Text>

        {/* Connexions sociales en premier */}
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
          <Text style={styles.socialButtonText}>S'inscrire avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.linkedInButton]} onPress={handleLinkedInSignUp}>
          <Text style={styles.socialButtonText}>S'inscrire avec LinkedIn</Text>
        </TouchableOpacity>

        {/* Séparateur */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OU</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Photo de profil */}
        <View style={styles.photoSection}>
          <Text style={styles.label}>Photo de profil</Text>
          <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
            {formData.photo ? (
              <Image source={{ uri: formData.photo }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>+</Text>
                <Text style={styles.photoPlaceholderSubtext}>Ajouter une photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nom *</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre nom"
            value={formData.nom}
            onChangeText={(text) => setFormData({ ...formData, nom: text })}
          />

          <Text style={styles.label}>Prénoms *</Text>
          <TextInput
            style={styles.input}
            placeholder="Vos prénoms"
            value={formData.prenoms}
            onChangeText={(text) => setFormData({ ...formData, prenoms: text })}
          />

          <Text style={styles.label}>Numéro de téléphone *</Text>
          <TextInput
            style={styles.input}
            placeholder="+225 XX XX XX XX XX"
            value={formData.numero}
            onChangeText={(text) => setFormData({ ...formData, numero: text })}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Âge *</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre âge"
            value={formData.age > 0 ? formData.age.toString() : ''}
            onChangeText={(text) => setFormData({ ...formData, age: parseInt(text) || 0 })}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Situation professionnelle</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Étudiant, Développeur, Entrepreneur..."
            value={formData.situationProfessionnelle}
            onChangeText={(text) => setFormData({ ...formData, situationProfessionnelle: text })}
          />

          <Text style={styles.label}>Domaines de compétence</Text>
          <View style={styles.competenceInputContainer}>
            <TextInput
              style={[styles.input, styles.competenceInput]}
              placeholder="Ex: Développement web, Design..."
              value={competenceInput}
              onChangeText={setCompetenceInput}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddCompetence}>
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>

          {/* Liste des compétences */}
          {formData.domainesCompetence.length > 0 && (
            <View style={styles.competenceList}>
              {formData.domainesCompetence.map((comp, index) => (
                <View key={index} style={styles.competenceTag}>
                  <Text style={styles.competenceTagText}>{comp}</Text>
                  <TouchableOpacity onPress={() => handleRemoveCompetence(index)}>
                    <Text style={styles.competenceTagRemove}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.label}>Email (optionnel)</Text>
          <TextInput
            style={styles.input}
            placeholder="votre@email.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {formData.email && (
            <>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry
              />

              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
            <Text style={styles.primaryButtonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>

        {/* Lien vers connexion */}
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.loginLink}>
            Déjà un compte ? <Text style={styles.loginLinkBold}>Se connecter</Text>
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
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoButton: {
    marginTop: 8,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    fontSize: 36,
    color: '#999',
  },
  photoPlaceholderSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
  competenceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  competenceInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  competenceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  competenceTag: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  competenceTagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  competenceTagRemove: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
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
  loginLink: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
    fontSize: 14,
    color: '#666',
  },
  loginLinkBold: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
