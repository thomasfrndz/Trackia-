import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'authentification
      // Dans une vraie app, vous feriez un appel API ici
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stocker le token d'authentification
      await SecureStore.setItemAsync('authToken', 'mock-jwt-token');
      
      // Vérifier si l'utilisateur a un abonnement actif
      const hasSubscription = await checkUserSubscription(email);
      await SecureStore.setItemAsync('subscription', hasSubscription ? 'active' : 'inactive');
      
      if (hasSubscription) {
        navigation.replace('Main');
      } else {
        navigation.replace('Subscription');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserSubscription = async (email) => {
    // Simulation - dans une vraie app, vous feriez un appel API
    // Pour la démo, on considère que l'utilisateur n'a pas d'abonnement
    return false;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Sport Coaching IA</Text>
            <Text style={styles.subtitle}>
              Votre coach personnel intelligent
            </Text>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Connexion</Title>
              <Paragraph style={styles.cardSubtitle}>
                Connectez-vous pour accéder à votre espace personnel
              </Paragraph>

              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
              />

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
              >
                Se connecter
              </Button>

              <Divider style={styles.divider} />

              <Button
                mode="text"
                onPress={() => navigation.navigate('Register')}
                style={styles.registerButton}
              >
                Pas encore de compte ? S'inscrire
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.features}>
            <Text style={styles.featuresTitle}>Fonctionnalités incluses :</Text>
            <Text style={styles.feature}>🤖 Coaching IA personnalisé</Text>
            <Text style={styles.feature}>💪 Plans d'entraînement adaptés</Text>
            <Text style={styles.feature}>📊 Suivi des progrès</Text>
            <Text style={styles.feature}>💬 Assistant IA 24/7</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    elevation: 8,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e293b',
  },
  cardSubtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#64748b',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 20,
  },
  registerButton: {
    marginTop: 10,
  },
  features: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  feature: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    textAlign: 'center',
  },
});