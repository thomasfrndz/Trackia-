import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  List,
  Avatar,
  Divider,
  Switch,
  Chip,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [notifications, setNotifications] = useState({
    workout: true,
    nutrition: true,
    progress: true,
    ai: false,
  });
  const [stats, setStats] = useState({
    totalWorkouts: 47,
    totalMinutes: 2340,
    totalCalories: 15600,
    streak: 12,
  });

  useEffect(() => {
    loadUserData();
    loadSubscriptionData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await SecureStore.getItemAsync('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadSubscriptionData = async () => {
    try {
      const subscription = await SecureStore.getItemAsync('subscription');
      const plan = await SecureStore.getItemAsync('subscriptionPlan');
      const date = await SecureStore.getItemAsync('subscriptionDate');
      
      if (subscription === 'active') {
        setSubscriptionData({
          status: 'active',
          plan: plan || 'monthly',
          startDate: date,
          nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }
    } catch (error) {
      console.error('Error loading subscription data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync('authToken');
              await SecureStore.deleteItemAsync('subscription');
              await SecureStore.deleteItemAsync('subscriptionPlan');
              await SecureStore.deleteItemAsync('subscriptionDate');
              navigation.replace('Login');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  const handleManageSubscription = () => {
    Alert.alert(
      'Gestion d\'abonnement',
      'Voulez-vous modifier ou annuler votre abonnement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Modifier',
          onPress: () => {
            // Navigation vers la gestion d'abonnement
            Alert.alert('Info', 'Fonctionnalité en cours de développement');
          },
        },
        {
          text: 'Annuler l\'abonnement',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Annuler l\'abonnement',
              'Êtes-vous sûr de vouloir annuler votre abonnement ? Vous perdrez l\'accès aux fonctionnalités premium.',
              [
                { text: 'Non', style: 'cancel' },
                {
                  text: 'Oui, annuler',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await SecureStore.setItemAsync('subscription', 'inactive');
                      setSubscriptionData(null);
                      Alert.alert('Abonnement annulé', 'Votre abonnement a été annulé avec succès.');
                    } catch (error) {
                      Alert.alert('Erreur', 'Impossible d\'annuler l\'abonnement');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const getSubscriptionStatusColor = (status) => {
    return status === 'active' ? '#10b981' : '#ef4444';
  };

  const getSubscriptionStatusText = (status) => {
    return status === 'active' ? 'Actif' : 'Inactif';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#ec4899', '#f97316']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Avatar.Text
            size={80}
            label={userData ? `${userData.firstName?.[0]}${userData.lastName?.[0]}` : 'U'}
            style={styles.avatar}
          />
          <Title style={styles.userName}>
            {userData ? `${userData.firstName} ${userData.lastName}` : 'Utilisateur'}
          </Title>
          <Paragraph style={styles.userEmail}>
            {userData?.email || 'email@example.com'}
          </Paragraph>
          {subscriptionData && (
            <Chip
              mode="outlined"
              textStyle={{ color: getSubscriptionStatusColor(subscriptionData.status) }}
              style={{ borderColor: getSubscriptionStatusColor(subscriptionData.status) }}
              icon="star"
            >
              {getSubscriptionStatusText(subscriptionData.status)}
            </Chip>
          )}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Statistiques */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Vos statistiques</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalWorkouts}</Text>
                <Text style={styles.statLabel}>Séances</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalMinutes}</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalCalories}</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.streak}</Text>
                <Text style={styles.statLabel}>Série</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Abonnement */}
        {subscriptionData ? (
          <Card style={styles.subscriptionCard}>
            <Card.Content>
              <View style={styles.subscriptionHeader}>
                <Ionicons name="star" size={24} color="#f59e0b" />
                <Title style={styles.subscriptionTitle}>Abonnement Premium</Title>
              </View>
              <Paragraph style={styles.subscriptionDescription}>
                Plan {subscriptionData.plan === 'monthly' ? 'Mensuel' : 'Annuel'} - 6,99€/mois
              </Paragraph>
              <Paragraph style={styles.subscriptionDate}>
                Prochain paiement : {new Date(subscriptionData.nextBilling).toLocaleDateString('fr-FR')}
              </Paragraph>
              <Button
                mode="outlined"
                onPress={handleManageSubscription}
                style={styles.manageButton}
              >
                Gérer l'abonnement
              </Button>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.subscriptionCard}>
            <Card.Content>
              <View style={styles.subscriptionHeader}>
                <Ionicons name="lock-closed" size={24} color="#64748b" />
                <Title style={styles.subscriptionTitle}>Version gratuite</Title>
              </View>
              <Paragraph style={styles.subscriptionDescription}>
                Débloquez toutes les fonctionnalités avec un abonnement Premium
              </Paragraph>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Subscription')}
                style={styles.upgradeButton}
              >
                Passer au Premium
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Notifications */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Notifications</Title>
            <List.Item
              title="Rappels d'entraînement"
              description="Recevez des notifications pour vos séances"
              left={() => <Ionicons name="fitness" size={24} color="#3b82f6" />}
              right={() => (
                <Switch
                  value={notifications.workout}
                  onValueChange={() => toggleNotification('workout')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Conseils nutrition"
              description="Tips et conseils alimentaires personnalisés"
              left={() => <Ionicons name="nutrition" size={24} color="#10b981" />}
              right={() => (
                <Switch
                  value={notifications.nutrition}
                  onValueChange={() => toggleNotification('nutrition')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Progrès et objectifs"
              description="Mises à jour sur vos performances"
              left={() => <Ionicons name="trending-up" size={24} color="#f59e0b" />}
              right={() => (
                <Switch
                  value={notifications.progress}
                  onValueChange={() => toggleNotification('progress')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Assistant IA"
              description="Conseils et rappels de l'IA"
              left={() => <Ionicons name="brain" size={24} color="#8b5cf6" />}
              right={() => (
                <Switch
                  value={notifications.ai}
                  onValueChange={() => toggleNotification('ai')}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Paramètres */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Paramètres</Title>
            <List.Item
              title="Modifier le profil"
              description="Changer vos informations personnelles"
              left={() => <Ionicons name="person" size={24} color="#6366f1" />}
              right={() => <Ionicons name="chevron-forward" size={20} color="#64748b" />}
              onPress={() => Alert.alert('Info', 'Fonctionnalité en cours de développement')}
            />
            <Divider />
            <List.Item
              title="Objectifs"
              description="Définir vos objectifs sportifs"
              left={() => <Ionicons name="target" size={24} color="#ec4899" />}
              right={() => <Ionicons name="chevron-forward" size={20} color="#64748b" />}
              onPress={() => Alert.alert('Info', 'Fonctionnalité en cours de développement')}
            />
            <Divider />
            <List.Item
              title="Aide et support"
              description="FAQ et contact support"
              left={() => <Ionicons name="help-circle" size={24} color="#10b981" />}
              right={() => <Ionicons name="chevron-forward" size={20} color="#64748b" />}
              onPress={() => Alert.alert('Info', 'Fonctionnalité en cours de développement')}
            />
            <Divider />
            <List.Item
              title="À propos"
              description="Version et informations"
              left={() => <Ionicons name="information-circle" size={24} color="#64748b" />}
              right={() => <Ionicons name="chevron-forward" size={20} color="#64748b" />}
              onPress={() => Alert.alert('À propos', 'Sport Coaching IA v1.0.0\nVotre coach personnel intelligent')}
            />
          </Card.Content>
        </Card>

        {/* Déconnexion */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor="#ef4444"
          icon="logout"
        >
          Se déconnecter
        </Button>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  content: {
    padding: 20,
    marginTop: -20,
  },
  statsCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e293b',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  subscriptionCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#1e293b',
  },
  subscriptionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  subscriptionDate: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 15,
  },
  manageButton: {
    borderRadius: 8,
    borderColor: '#6366f1',
  },
  upgradeButton: {
    borderRadius: 8,
  },
  settingsCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  logoutButton: {
    borderRadius: 8,
    borderColor: '#ef4444',
    marginBottom: 20,
  },
});