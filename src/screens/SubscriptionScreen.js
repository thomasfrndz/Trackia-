import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  List,
  Checkbox,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

export default function SubscriptionScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const plans = {
    monthly: {
      id: 'monthly',
      name: 'Abonnement Mensuel',
      price: '6,99€',
      period: '/mois',
      description: 'Accès complet à toutes les fonctionnalités',
      features: [
        'Plans d\'entraînement personnalisés',
        'Coaching IA 24/7',
        'Suivi des progrès détaillé',
        'Base de données d\'exercices',
        'Conseils nutritionnels',
        'Support prioritaire',
      ],
      popular: false,
    },
    yearly: {
      id: 'yearly',
      name: 'Abonnement Annuel',
      price: '59,99€',
      period: '/an',
      description: 'Économisez 2 mois !',
      features: [
        'Tout l\'abonnement mensuel',
        'Économie de 24€ par an',
        'Accès anticipé aux nouvelles fonctionnalités',
        'Sessions de coaching en direct',
        'Plan nutritionnel personnalisé',
      ],
      popular: true,
    },
  };

  const handleSubscribe = async () => {
    if (!acceptedTerms) {
      Alert.alert('Erreur', 'Veuillez accepter les conditions d\'utilisation');
      return;
    }

    setIsLoading(true);

    try {
      // Simulation du processus de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Activer l'abonnement
      await SecureStore.setItemAsync('subscription', 'active');
      await SecureStore.setItemAsync('subscriptionPlan', selectedPlan);
      await SecureStore.setItemAsync('subscriptionDate', new Date().toISOString());
      
      Alert.alert(
        'Abonnement activé !',
        'Félicitations ! Votre abonnement a été activé avec succès. Vous avez maintenant accès à toutes les fonctionnalités premium.',
        [
          {
            text: 'Commencer',
            onPress: () => navigation.replace('Main'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Échec du paiement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Version gratuite',
      'Vous pouvez essayer l\'application avec des fonctionnalités limitées. Pour débloquer toutes les fonctionnalités, un abonnement est requis.',
      [
        {
          text: 'Continuer gratuitement',
          onPress: () => navigation.replace('Main'),
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#10b981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="star" size={40} color="white" />
          <Text style={styles.headerTitle}>Passez au Premium</Text>
          <Text style={styles.headerSubtitle}>
            Débloquez tout le potentiel de votre entraînement
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title style={styles.featuresTitle}>Fonctionnalités Premium</Title>
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <Ionicons name="brain" size={24} color="#6366f1" />
                <Text style={styles.featureText}>Coaching IA</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="fitness" size={24} color="#ec4899" />
                <Text style={styles.featureText}>Plans personnalisés</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="trending-up" size={24} color="#f59e0b" />
                <Text style={styles.featureText}>Suivi progrès</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="chatbubble" size={24} color="#8b5cf6" />
                <Text style={styles.featureText}>Support 24/7</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.plansContainer}>
          {Object.values(plans).map((plan) => (
            <Card
              key={plan.id}
              style={[
                styles.planCard,
                plan.popular && styles.popularCard,
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>POPULAIRE</Text>
                </View>
              )}
              <Card.Content>
                <View style={styles.planHeader}>
                  <Title style={styles.planName}>{plan.name}</Title>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{plan.price}</Text>
                    <Text style={styles.period}>{plan.period}</Text>
                  </View>
                </View>
                <Paragraph style={styles.planDescription}>
                  {plan.description}
                </Paragraph>
                <List.Section>
                  {plan.features.map((feature, index) => (
                    <List.Item
                      key={index}
                      title={feature}
                      left={() => (
                        <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                      )}
                      titleStyle={styles.featureItemText}
                    />
                  ))}
                </List.Section>
                <Button
                  mode={selectedPlan === plan.id ? 'contained' : 'outlined'}
                  onPress={() => setSelectedPlan(plan.id)}
                  style={[
                    styles.planButton,
                    selectedPlan === plan.id && styles.selectedPlanButton,
                  ]}
                >
                  {selectedPlan === plan.id ? 'Sélectionné' : 'Sélectionner'}
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Card style={styles.termsCard}>
          <Card.Content>
            <View style={styles.termsRow}>
              <Checkbox
                status={acceptedTerms ? 'checked' : 'unchecked'}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              />
              <Text style={styles.termsText}>
                J'accepte les{' '}
                <Text style={styles.linkText}>conditions d'utilisation</Text>
                {' '}et la{' '}
                <Text style={styles.linkText}>politique de confidentialité</Text>
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubscribe}
            loading={isLoading}
            disabled={isLoading || !acceptedTerms}
            style={styles.subscribeButton}
            contentStyle={styles.buttonContent}
          >
            S'abonner maintenant - {plans[selectedPlan].price}{plans[selectedPlan].period}
          </Button>
          
          <Button
            mode="text"
            onPress={handleSkip}
            style={styles.skipButton}
          >
            Essayer gratuitement
          </Button>
        </View>

        <View style={styles.guarantee}>
          <Ionicons name="shield-checkmark" size={24} color="#10b981" />
          <Text style={styles.guaranteeText}>
            Garantie satisfait ou remboursé 30 jours
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    marginTop: -20,
  },
  featuresCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e293b',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  featureItem: {
    alignItems: 'center',
    width: '45%',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
    color: '#64748b',
  },
  plansContainer: {
    marginBottom: 20,
  },
  planCard: {
    marginBottom: 15,
    borderRadius: 16,
    elevation: 4,
    position: 'relative',
  },
  popularCard: {
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: 20,
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  period: {
    fontSize: 14,
    color: '#64748b',
  },
  planDescription: {
    color: '#64748b',
    marginBottom: 15,
  },
  featureItemText: {
    fontSize: 14,
    color: '#374151',
  },
  planButton: {
    marginTop: 15,
    borderRadius: 8,
  },
  selectedPlanButton: {
    backgroundColor: '#6366f1',
  },
  termsCard: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  linkText: {
    color: '#6366f1',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  subscribeButton: {
    borderRadius: 12,
    marginBottom: 10,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  skipButton: {
    marginTop: 5,
  },
  guarantee: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  guaranteeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
});