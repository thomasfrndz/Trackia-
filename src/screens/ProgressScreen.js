import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  ProgressBar,
  SegmentedButtons,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function ProgressScreen({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('workouts');
  const [progressData, setProgressData] = useState(null);

  const periods = [
    { value: 'week', label: 'Semaine' },
    { value: 'month', label: 'Mois' },
    { value: 'year', label: 'Année' },
  ];

  const metrics = [
    { value: 'workouts', label: 'Séances' },
    { value: 'calories', label: 'Calories' },
    { value: 'duration', label: 'Durée' },
    { value: 'strength', label: 'Force' },
  ];

  useEffect(() => {
    loadProgressData();
  }, [selectedPeriod, selectedMetric]);

  const loadProgressData = () => {
    // Simulation des données de progrès
    const mockData = {
      week: {
        workouts: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            data: [1, 2, 0, 1, 3, 2, 1],
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
          }],
        },
        calories: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            data: [300, 450, 0, 250, 600, 400, 350],
            color: (opacity = 1) => `rgba(236, 72, 153, ${opacity})`,
          }],
        },
        duration: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            data: [30, 45, 0, 25, 60, 40, 35],
            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
          }],
        },
        strength: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            data: [80, 85, 0, 82, 90, 88, 85],
            color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
          }],
        },
      },
      month: {
        workouts: {
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
          datasets: [{
            data: [8, 12, 10, 15],
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
          }],
        },
        calories: {
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
          datasets: [{
            data: [2000, 3000, 2500, 3500],
            color: (opacity = 1) => `rgba(236, 72, 153, ${opacity})`,
          }],
        },
        duration: {
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
          datasets: [{
            data: [200, 300, 250, 350],
            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
          }],
        },
        strength: {
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
          datasets: [{
            data: [320, 340, 330, 360],
            color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
          }],
        },
      },
      year: {
        workouts: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [{
            data: [45, 52, 48, 60, 55, 47],
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
          }],
        },
        calories: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [{
            data: [12000, 14000, 13000, 16000, 15000, 12500],
            color: (opacity = 1) => `rgba(236, 72, 153, ${opacity})`,
          }],
        },
        duration: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [{
            data: [1200, 1400, 1300, 1600, 1500, 1250],
            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
          }],
        },
        strength: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [{
            data: [1200, 1350, 1300, 1450, 1400, 1320],
            color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
          }],
        },
      },
    };

    setProgressData(mockData[selectedPeriod][selectedMetric]);
  };

  const getCurrentStats = () => {
    const stats = {
      week: {
        workouts: { current: 10, target: 12, unit: 'séances' },
        calories: { current: 2350, target: 3000, unit: 'cal' },
        duration: { current: 235, target: 300, unit: 'min' },
        strength: { current: 85, target: 100, unit: '%' },
      },
      month: {
        workouts: { current: 45, target: 50, unit: 'séances' },
        calories: { current: 11000, target: 15000, unit: 'cal' },
        duration: { current: 1100, target: 1500, unit: 'min' },
        strength: { current: 78, target: 90, unit: '%' },
      },
      year: {
        workouts: { current: 307, target: 400, unit: 'séances' },
        calories: { current: 82500, target: 120000, unit: 'cal' },
        duration: { current: 8250, target: 12000, unit: 'min' },
        strength: { current: 82, target: 95, unit: '%' },
      },
    };

    return stats[selectedPeriod][selectedMetric];
  };

  const getMetricTitle = () => {
    const titles = {
      workouts: 'Séances d\'entraînement',
      calories: 'Calories brûlées',
      duration: 'Durée d\'entraînement',
      strength: 'Niveau de force',
    };
    return titles[selectedMetric];
  };

  const getMetricIcon = () => {
    const icons = {
      workouts: 'fitness',
      calories: 'flame',
      duration: 'time',
      strength: 'barbell',
    };
    return icons[selectedMetric];
  };

  const getMetricColor = () => {
    const colors = {
      workouts: '#6366f1',
      calories: '#ec4899',
      duration: '#10b981',
      strength: '#f59e0b',
    };
    return colors[selectedMetric];
  };

  const currentStats = getCurrentStats();
  const progressPercentage = (currentStats.current / currentStats.target) * 100;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#6366f1',
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#10b981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Title style={styles.headerTitle}>Mes Progrès</Title>
          <Paragraph style={styles.headerSubtitle}>
            Suivez votre évolution et atteignez vos objectifs
          </Paragraph>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Période */}
        <Card style={styles.periodCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Période</Title>
            <SegmentedButtons
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
              buttons={periods}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        {/* Métrique */}
        <Card style={styles.metricCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Métrique</Title>
            <SegmentedButtons
              value={selectedMetric}
              onValueChange={setSelectedMetric}
              buttons={metrics}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        {/* Statistiques actuelles */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <View style={styles.statsHeader}>
              <View style={styles.statsTitleContainer}>
                <Ionicons name={getMetricIcon()} size={24} color={getMetricColor()} />
                <Title style={styles.statsTitle}>{getMetricTitle()}</Title>
              </View>
              <Chip
                mode="outlined"
                textStyle={{ color: getMetricColor() }}
                style={{ borderColor: getMetricColor() }}
              >
                {progressPercentage.toFixed(0)}%
              </Chip>
            </View>
            
            <View style={styles.statsNumbers}>
              <Text style={styles.currentNumber}>{currentStats.current}</Text>
              <Text style={styles.targetNumber}>/ {currentStats.target} {currentStats.unit}</Text>
            </View>
            
            <ProgressBar
              progress={progressPercentage / 100}
              color={getMetricColor()}
              style={styles.progressBar}
            />
            
            <View style={styles.statsFooter}>
              <Text style={styles.remainingText}>
                {currentStats.target - currentStats.current} {currentStats.unit} restants
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Graphique */}
        {progressData && (
          <Card style={styles.chartCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>Évolution</Title>
              <View style={styles.chartContainer}>
                <LineChart
                  data={progressData}
                  width={width - 80}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Objectifs */}
        <Card style={styles.goalsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Objectifs de la semaine</Title>
            <View style={styles.goalsList}>
              <View style={styles.goalItem}>
                <Ionicons name="fitness" size={20} color="#6366f1" />
                <Text style={styles.goalText}>3 séances de cardio</Text>
                <Chip mode="outlined" textStyle={{ color: '#10b981' }}>✓ Terminé</Chip>
              </View>
              <View style={styles.goalItem}>
                <Ionicons name="barbell" size={20} color="#3b82f6" />
                <Text style={styles.goalText}>2 séances de musculation</Text>
                <Chip mode="outlined" textStyle={{ color: '#f59e0b' }}>En cours</Chip>
              </View>
              <View style={styles.goalItem}>
                <Ionicons name="leaf" size={20} color="#10b981" />
                <Text style={styles.goalText}>1 séance de yoga</Text>
                <Chip mode="outlined" textStyle={{ color: '#64748b' }}>À faire</Chip>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Récompenses */}
        <Card style={styles.achievementsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Récompenses récentes</Title>
            <View style={styles.achievementsList}>
              <View style={styles.achievementItem}>
                <Ionicons name="trophy" size={24} color="#f59e0b" />
                <View style={styles.achievementText}>
                  <Text style={styles.achievementTitle}>Série de 7 jours</Text>
                  <Text style={styles.achievementDesc}>Entraînement consécutif</Text>
                </View>
              </View>
              <View style={styles.achievementItem}>
                <Ionicons name="flame" size={24} color="#ef4444" />
                <View style={styles.achievementText}>
                  <Text style={styles.achievementTitle}>1000 calories</Text>
                  <Text style={styles.achievementDesc}>Brûlées en une semaine</Text>
                </View>
              </View>
              <View style={styles.achievementItem}>
                <Ionicons name="star" size={24} color="#8b5cf6" />
                <View style={styles.achievementText}>
                  <Text style={styles.achievementTitle}>Nouveau record</Text>
                  <Text style={styles.achievementDesc}>45 minutes d'entraînement</Text>
                </View>
              </View>
            </View>
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
  periodCard: {
    marginBottom: 15,
    borderRadius: 16,
    elevation: 4,
  },
  metricCard: {
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
  segmentedButtons: {
    marginTop: 10,
  },
  statsCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#1e293b',
  },
  statsNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  currentNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  targetNumber: {
    fontSize: 18,
    color: '#64748b',
    marginLeft: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  statsFooter: {
    alignItems: 'center',
  },
  remainingText: {
    fontSize: 14,
    color: '#64748b',
  },
  chartCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  chart: {
    borderRadius: 16,
  },
  goalsCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  goalsList: {
    marginTop: 10,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1e293b',
  },
  achievementsCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  achievementsList: {
    marginTop: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementText: {
    marginLeft: 15,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#64748b',
  },
});