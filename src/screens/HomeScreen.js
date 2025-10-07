import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  Avatar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [todaysWorkout, setTodaysWorkout] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState({
    completed: 3,
    total: 5,
    calories: 1250,
    minutes: 180,
  });

  useEffect(() => {
    loadUserData();
    loadTodaysWorkout();
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

  const loadTodaysWorkout = () => {
    // Simulation d'un plan d'entraînement du jour
    setTodaysWorkout({
      id: 1,
      name: 'Entraînement Cardio Intense',
      duration: 45,
      difficulty: 'Intermédiaire',
      exercises: 8,
      calories: 350,
      type: 'cardio',
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    await loadTodaysWorkout();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getWorkoutTypeColor = (type) => {
    const colors = {
      cardio: '#ef4444',
      strength: '#3b82f6',
      flexibility: '#10b981',
      balance: '#8b5cf6',
    };
    return colors[type] || '#6366f1';
  };

  const quickActions = [
    {
      title: 'Nouvel entraînement',
      icon: 'add-circle',
      color: '#6366f1',
      onPress: () => navigation.navigate('Workout'),
    },
    {
      title: 'Assistant IA',
      icon: 'chatbubble',
      color: '#ec4899',
      onPress: () => navigation.navigate('AI'),
    },
    {
      title: 'Mes progrès',
      icon: 'trending-up',
      color: '#10b981',
      onPress: () => navigation.navigate('Progress'),
    },
    {
      title: 'Exercices',
      icon: 'fitness',
      color: '#f59e0b',
      onPress: () => navigation.navigate('Workout'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Avatar.Text
              size={50}
              label={userData ? `${userData.firstName?.[0]}${userData.lastName?.[0]}` : 'U'}
              style={styles.avatar}
            />
            <View style={styles.userText}>
              <Text style={styles.greeting}>
                {getGreeting()}, {userData?.firstName || 'Utilisateur'} !
              </Text>
              <Text style={styles.motivation}>
                Prêt pour un nouvel entraînement ? 💪
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Statistiques hebdomadaires */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Cette semaine</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {weeklyProgress.completed}/{weeklyProgress.total}
                </Text>
                <Text style={styles.statLabel}>Séances</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{weeklyProgress.calories}</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{weeklyProgress.minutes}</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Entraînement du jour */}
        {todaysWorkout && (
          <Card style={styles.workoutCard}>
            <Card.Content>
              <View style={styles.workoutHeader}>
                <Title style={styles.workoutTitle}>Entraînement du jour</Title>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getWorkoutTypeColor(todaysWorkout.type) }}
                  style={{ borderColor: getWorkoutTypeColor(todaysWorkout.type) }}
                >
                  {todaysWorkout.type}
                </Chip>
              </View>
              <Paragraph style={styles.workoutDescription}>
                {todaysWorkout.name}
              </Paragraph>
              <View style={styles.workoutStats}>
                <View style={styles.workoutStat}>
                  <Ionicons name="time" size={16} color="#64748b" />
                  <Text style={styles.workoutStatText}>{todaysWorkout.duration} min</Text>
                </View>
                <View style={styles.workoutStat}>
                  <Ionicons name="fitness" size={16} color="#64748b" />
                  <Text style={styles.workoutStatText}>{todaysWorkout.exercises} exercices</Text>
                </View>
                <View style={styles.workoutStat}>
                  <Ionicons name="flame" size={16} color="#64748b" />
                  <Text style={styles.workoutStatText}>{todaysWorkout.calories} cal</Text>
                </View>
              </View>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Workout')}
                style={styles.startWorkoutButton}
              >
                Commencer l'entraînement
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Actions rapides */}
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Actions rapides</Title>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  mode="outlined"
                  onPress={action.onPress}
                  style={[styles.actionButton, { borderColor: action.color }]}
                  labelStyle={{ color: action.color }}
                  icon={action.icon}
                >
                  {action.title}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Conseils IA */}
        <Card style={styles.tipCard}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Ionicons name="bulb" size={24} color="#f59e0b" />
              <Title style={styles.tipTitle}>Conseil IA</Title>
            </View>
            <Paragraph style={styles.tipText}>
              💡 Pour optimiser vos résultats, essayez de varier l'intensité de vos entraînements. 
              Alternez entre des séances intenses et des séances plus modérées pour permettre à votre corps de récupérer.
            </Paragraph>
            <Button
              mode="text"
              onPress={() => navigation.navigate('AI')}
              style={styles.tipButton}
            >
              Plus de conseils →
            </Button>
          </Card.Content>
        </Card>
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
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 15,
  },
  userText: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  motivation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
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
  workoutCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  workoutDescription: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 15,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutStatText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748b',
  },
  startWorkoutButton: {
    borderRadius: 8,
  },
  actionsCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 8,
  },
  tipCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#fef3c7',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#92400e',
  },
  tipText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
    marginBottom: 10,
  },
  tipButton: {
    alignSelf: 'flex-start',
  },
});