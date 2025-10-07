import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  ProgressBar,
  List,
  Divider,
  FAB,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function WorkoutScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([]);

  const categories = [
    { id: 'all', name: 'Tous', icon: 'grid' },
    { id: 'cardio', name: 'Cardio', icon: 'heart', color: '#ef4444' },
    { id: 'strength', name: 'Musculation', icon: 'fitness', color: '#3b82f6' },
    { id: 'flexibility', name: 'Flexibilité', icon: 'leaf', color: '#10b981' },
    { id: 'balance', name: 'Équilibre', icon: 'walk', color: '#8b5cf6' },
  ];

  useEffect(() => {
    loadWorkouts();
    loadAIRecommendations();
  }, []);

  const loadWorkouts = async () => {
    setIsLoading(true);
    try {
      // Simulation de chargement des entraînements
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWorkouts = [
        {
          id: 1,
          name: 'HIIT Cardio Intense',
          category: 'cardio',
          duration: 30,
          difficulty: 'Intermédiaire',
          calories: 400,
          exercises: 12,
          description: 'Entraînement par intervalles à haute intensité pour brûler les calories',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          aiGenerated: true,
          rating: 4.8,
        },
        {
          id: 2,
          name: 'Musculation Complète',
          category: 'strength',
          duration: 45,
          difficulty: 'Avancé',
          calories: 350,
          exercises: 8,
          description: 'Séance complète de musculation pour tout le corps',
          image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400',
          aiGenerated: true,
          rating: 4.9,
        },
        {
          id: 3,
          name: 'Yoga Flow',
          category: 'flexibility',
          duration: 25,
          difficulty: 'Débutant',
          calories: 150,
          exercises: 15,
          description: 'Séquence de yoga pour améliorer la flexibilité et la relaxation',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          aiGenerated: false,
          rating: 4.7,
        },
        {
          id: 4,
          name: 'Core & Équilibre',
          category: 'balance',
          duration: 20,
          difficulty: 'Intermédiaire',
          calories: 200,
          exercises: 10,
          description: 'Exercices de gainage et d\'équilibre pour un corps stable',
          image: 'https://images.unsplash.com/photo-1506629905607-0b2b4a2b4b4b?w=400',
          aiGenerated: true,
          rating: 4.6,
        },
      ];
      
      setWorkouts(mockWorkouts);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les entraînements');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAIRecommendations = () => {
    // Simulation des recommandations IA
    setAiRecommendations([
      {
        id: 1,
        title: 'Entraînement personnalisé',
        description: 'Basé sur votre niveau et vos objectifs',
        icon: 'brain',
        color: '#6366f1',
      },
      {
        id: 2,
        title: 'Plan nutritionnel',
        description: 'Optimisé pour vos entraînements',
        icon: 'nutrition',
        color: '#10b981',
      },
      {
        id: 3,
        title: 'Récupération active',
        description: 'Exercices de récupération personnalisés',
        icon: 'leaf',
        color: '#8b5cf6',
      },
    ]);
  };

  const getFilteredWorkouts = () => {
    if (selectedCategory === 'all') {
      return workouts;
    }
    return workouts.filter(workout => workout.category === selectedCategory);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Débutant': '#10b981',
      'Intermédiaire': '#f59e0b',
      'Avancé': '#ef4444',
    };
    return colors[difficulty] || '#6366f1';
  };

  const startWorkout = (workout) => {
    Alert.alert(
      'Commencer l\'entraînement',
      `Voulez-vous commencer "${workout.name}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Commencer',
          onPress: () => {
            // Ici vous navigueriez vers l'écran de l'entraînement en cours
            Alert.alert('Entraînement', 'L\'entraînement va commencer !');
          },
        },
      ]
    );
  };

  const generateAIWorkout = () => {
    Alert.alert(
      'Générer un entraînement IA',
      'L\'IA va créer un plan d\'entraînement personnalisé basé sur vos préférences et votre niveau.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Générer',
          onPress: () => {
            // Simulation de génération IA
            Alert.alert('IA', 'Votre entraînement personnalisé a été généré !');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header avec gradient */}
        <LinearGradient
          colors={['#3b82f6', '#1d4ed8']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Title style={styles.headerTitle}>Entraînements</Title>
            <Paragraph style={styles.headerSubtitle}>
              Choisissez votre séance ou laissez l'IA vous guider
            </Paragraph>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Recommandations IA */}
          <Card style={styles.aiCard}>
            <Card.Content>
              <View style={styles.aiHeader}>
                <Ionicons name="brain" size={24} color="#6366f1" />
                <Title style={styles.aiTitle}>Recommandations IA</Title>
              </View>
              <View style={styles.aiRecommendations}>
                {aiRecommendations.map((rec) => (
                  <View key={rec.id} style={styles.aiRecommendation}>
                    <Ionicons name={rec.icon} size={20} color={rec.color} />
                    <View style={styles.aiRecommendationText}>
                      <Text style={styles.aiRecommendationTitle}>{rec.title}</Text>
                      <Text style={styles.aiRecommendationDesc}>{rec.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <Button
                mode="contained"
                onPress={generateAIWorkout}
                style={styles.aiButton}
                icon="sparkles"
              >
                Générer un entraînement IA
              </Button>
            </Card.Content>
          </Card>

          {/* Catégories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <Chip
                key={category.id}
                selected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.selectedCategoryChip,
                ]}
                textStyle={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText,
                ]}
                icon={category.icon}
              >
                {category.name}
              </Chip>
            ))}
          </ScrollView>

          {/* Liste des entraînements */}
          <View style={styles.workoutsContainer}>
            {getFilteredWorkouts().map((workout) => (
              <Card key={workout.id} style={styles.workoutCard}>
                <Card.Content>
                  <View style={styles.workoutHeader}>
                    <View style={styles.workoutInfo}>
                      <Title style={styles.workoutName}>{workout.name}</Title>
                      <Paragraph style={styles.workoutDescription}>
                        {workout.description}
                      </Paragraph>
                    </View>
                    {workout.aiGenerated && (
                      <Chip
                        mode="outlined"
                        textStyle={{ color: '#6366f1', fontSize: 10 }}
                        style={{ borderColor: '#6366f1' }}
                        icon="brain"
                      >
                        IA
                      </Chip>
                    )}
                  </View>

                  <View style={styles.workoutStats}>
                    <View style={styles.workoutStat}>
                      <Ionicons name="time" size={16} color="#64748b" />
                      <Text style={styles.workoutStatText}>{workout.duration} min</Text>
                    </View>
                    <View style={styles.workoutStat}>
                      <Ionicons name="fitness" size={16} color="#64748b" />
                      <Text style={styles.workoutStatText}>{workout.exercises} exercices</Text>
                    </View>
                    <View style={styles.workoutStat}>
                      <Ionicons name="flame" size={16} color="#64748b" />
                      <Text style={styles.workoutStatText}>{workout.calories} cal</Text>
                    </View>
                    <View style={styles.workoutStat}>
                      <Ionicons name="star" size={16} color="#f59e0b" />
                      <Text style={styles.workoutStatText}>{workout.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.workoutFooter}>
                    <Chip
                      mode="outlined"
                      textStyle={{ color: getDifficultyColor(workout.difficulty) }}
                      style={{ borderColor: getDifficultyColor(workout.difficulty) }}
                    >
                      {workout.difficulty}
                    </Chip>
                    <Button
                      mode="contained"
                      onPress={() => startWorkout(workout)}
                      style={styles.startButton}
                      compact
                    >
                      Commencer
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FAB pour générer un entraînement IA */}
      <FAB
        style={styles.fab}
        icon="sparkles"
        label="IA"
        onPress={generateAIWorkout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
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
  aiCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#f0f9ff',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#1e293b',
  },
  aiRecommendations: {
    marginBottom: 15,
  },
  aiRecommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  aiRecommendationText: {
    marginLeft: 10,
    flex: 1,
  },
  aiRecommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  aiRecommendationDesc: {
    fontSize: 12,
    color: '#64748b',
  },
  aiButton: {
    borderRadius: 8,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryChip: {
    marginRight: 10,
    backgroundColor: 'white',
  },
  selectedCategoryChip: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    color: '#64748b',
  },
  selectedCategoryText: {
    color: 'white',
  },
  workoutsContainer: {
    marginBottom: 80,
  },
  workoutCard: {
    marginBottom: 15,
    borderRadius: 16,
    elevation: 4,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  workoutInfo: {
    flex: 1,
    marginRight: 10,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutStatText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButton: {
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6366f1',
  },
});