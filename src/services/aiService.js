// Service pour l'intelligence artificielle
import { exercises, workoutPlans, aiWorkoutGenerator } from '../data/exercises';

class AIService {
  constructor() {
    this.conversationHistory = [];
    this.userPreferences = {};
  }

  // Génération de réponse IA basée sur le contexte
  async generateResponse(userMessage, context = {}) {
    const response = await this.processMessage(userMessage, context);
    this.conversationHistory.push({
      user: userMessage,
      ai: response,
      timestamp: new Date(),
    });
    return response;
  }

  // Traitement des messages utilisateur
  async processMessage(message, context) {
    const lowerMessage = message.toLowerCase();
    
    // Détection d'intention
    const intent = this.detectIntent(lowerMessage);
    
    switch (intent) {
      case 'workout_advice':
        return this.getWorkoutAdvice(message, context);
      case 'nutrition_advice':
        return this.getNutritionAdvice(message, context);
      case 'injury_prevention':
        return this.getInjuryPreventionAdvice(message, context);
      case 'motivation':
        return this.getMotivationalMessage(message, context);
      case 'exercise_question':
        return this.getExerciseAnswer(message, context);
      case 'general_question':
        return this.getGeneralAnswer(message, context);
      default:
        return this.getDefaultResponse(message, context);
    }
  }

  // Détection de l'intention du message
  detectIntent(message) {
    const workoutKeywords = ['entraînement', 'exercice', 'sport', 'musculation', 'cardio', 'séance'];
    const nutritionKeywords = ['alimentation', 'nutrition', 'régime', 'manger', 'calories', 'protéines'];
    const injuryKeywords = ['blessure', 'douleur', 'prévention', 'échauffement', 'étirement'];
    const motivationKeywords = ['motivation', 'découragé', 'difficile', 'abandonner', 'continuer'];
    const exerciseKeywords = ['comment faire', 'technique', 'exécution', 'mouvement'];

    if (workoutKeywords.some(keyword => message.includes(keyword))) {
      return 'workout_advice';
    }
    if (nutritionKeywords.some(keyword => message.includes(keyword))) {
      return 'nutrition_advice';
    }
    if (injuryKeywords.some(keyword => message.includes(keyword))) {
      return 'injury_prevention';
    }
    if (motivationKeywords.some(keyword => message.includes(keyword))) {
      return 'motivation';
    }
    if (exerciseKeywords.some(keyword => message.includes(keyword))) {
      return 'exercise_question';
    }
    return 'general_question';
  }

  // Conseils d'entraînement
  getWorkoutAdvice(message, context) {
    const advice = [
      "Pour améliorer votre forme physique, je recommande de combiner cardio et musculation. Commencez par 3 séances par semaine avec des exercices variés. L'important est la régularité !",
      "Un bon entraînement commence toujours par un échauffement de 5-10 minutes. Cela prépare votre corps et réduit les risques de blessures.",
      "Variez vos entraînements pour éviter la monotonie. Alternez entre cardio, musculation, flexibilité et équilibre.",
      "La progression est la clé ! Augmentez graduellement l'intensité et la durée de vos séances.",
      "Écoutez votre corps. Si vous ressentez une douleur inhabituelle, arrêtez-vous et consultez un professionnel.",
    ];
    return advice[Math.floor(Math.random() * advice.length)];
  }

  // Conseils nutritionnels
  getNutritionAdvice(message, context) {
    const advice = [
      "Une alimentation équilibrée est cruciale pour vos performances ! Privilégiez les protéines maigres, les glucides complexes et les bonnes graisses.",
      "Hydratez-vous bien avant, pendant et après l'entraînement. Buvez au moins 2-3 litres d'eau par jour.",
      "Mangez 5-6 petits repas par jour plutôt que 3 gros repas. Cela maintient votre métabolisme actif.",
      "Les protéines sont essentielles pour la récupération musculaire. Consommez-en 1.2-1.6g par kg de poids corporel.",
      "Les glucides sont votre carburant ! Mangez-en avant l'entraînement pour avoir de l'énergie.",
    ];
    return advice[Math.floor(Math.random() * advice.length)];
  }

  // Prévention des blessures
  getInjuryPreventionAdvice(message, context) {
    const advice = [
      "Pour éviter les blessures : échauffez-vous toujours, progressez graduellement, écoutez votre corps, et n'oubliez pas les étirements.",
      "La récupération est aussi importante que l'entraînement ! Dormez 7-9h par nuit et prenez des jours de repos.",
      "Une bonne technique est primordiale. Mieux vaut faire moins de répétitions avec une technique parfaite.",
      "Écoutez les signaux de votre corps. La fatigue, les douleurs articulaires sont des signes d'alerte.",
      "Équilibrez votre entraînement. Ne négligez pas les étirements et le travail de mobilité.",
    ];
    return advice[Math.floor(Math.random() * advice.length)];
  }

  // Messages de motivation
  getMotivationalMessage(message, context) {
    const messages = [
      "Chaque petit pas compte ! Vous êtes plus fort que vous ne le pensez. Continuez ! 💪",
      "Les champions ne sont pas nés champions, ils le deviennent. Vous êtes sur la bonne voie !",
      "Rappelez-vous pourquoi vous avez commencé. Vos objectifs vous attendent !",
      "Chaque séance vous rapproche de votre objectif. Vous faites du super travail !",
      "La persévérance est la clé du succès. Vous êtes capable de grandes choses !",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Réponses sur les exercices
  getExerciseAnswer(message, context) {
    const exercise = this.findExerciseInMessage(message);
    if (exercise) {
      return `Pour bien exécuter les ${exercise.name} : ${exercise.instructions.join(' ')}. ${exercise.tips.join(' ')}`;
    }
    return "Je peux vous aider avec la technique de nombreux exercices. Pouvez-vous être plus spécifique ?";
  }

  // Réponse générale
  getGeneralAnswer(message, context) {
    const responses = [
      "Je suis là pour vous accompagner dans votre parcours sportif. N'hésitez pas à me poser des questions spécifiques !",
      "Comment puis-je vous aider aujourd'hui ? Je peux vous conseiller sur l'entraînement, la nutrition, ou la récupération.",
      "Votre bien-être est ma priorité. Que souhaitez-vous savoir ?",
      "Je suis votre coach personnel ! Posez-moi toutes vos questions sur le sport et la forme physique.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Réponse par défaut
  getDefaultResponse(message, context) {
    return "Merci pour votre message ! Je suis là pour vous aider avec vos questions sur l'entraînement, la nutrition, et la récupération. Que puis-je faire pour vous ?";
  }

  // Recherche d'exercice dans le message
  findExerciseInMessage(message) {
    return exercises.find(exercise => 
      message.toLowerCase().includes(exercise.name.toLowerCase())
    );
  }

  // Génération de plan d'entraînement personnalisé
  generatePersonalizedWorkout(userProfile) {
    const { level, goals, availableTime, preferences } = userProfile;
    return aiWorkoutGenerator.generateWorkout(level, goals, availableTime, preferences);
  }

  // Recommandations basées sur l'historique
  getPersonalizedRecommendations(userHistory, currentGoals) {
    return aiWorkoutGenerator.getRecommendations(userHistory, currentGoals);
  }

  // Analyse des progrès
  analyzeProgress(progressData) {
    const analysis = {
      trends: this.analyzeTrends(progressData),
      recommendations: this.generateProgressRecommendations(progressData),
      achievements: this.checkAchievements(progressData),
    };
    return analysis;
  }

  // Analyse des tendances
  analyzeTrends(data) {
    // Logique d'analyse des tendances
    return {
      improvement: data.workouts > data.previousWorkouts,
      consistency: data.weeklyAverage > 3,
      intensity: data.caloriesPerWorkout > 200,
    };
  }

  // Recommandations de progrès
  generateProgressRecommendations(data) {
    const recommendations = [];
    
    if (data.workouts < 3) {
      recommendations.push("Essayez d'augmenter la fréquence de vos entraînements à 3-4 fois par semaine");
    }
    
    if (data.caloriesPerWorkout < 200) {
      recommendations.push("Intensifiez vos séances pour brûler plus de calories");
    }
    
    if (data.consistency < 0.8) {
      recommendations.push("Travaillez sur la régularité de vos entraînements");
    }
    
    return recommendations;
  }

  // Vérification des accomplissements
  checkAchievements(data) {
    const achievements = [];
    
    if (data.totalWorkouts >= 10) {
      achievements.push("Félicitations ! Vous avez complété 10 entraînements !");
    }
    
    if (data.streak >= 7) {
      achievements.push("Impressionnant ! 7 jours consécutifs d'entraînement !");
    }
    
    if (data.totalCalories >= 10000) {
      achievements.push("Incroyable ! Vous avez brûlé 10 000 calories !");
    }
    
    return achievements;
  }

  // Réinitialisation de l'historique
  resetConversation() {
    this.conversationHistory = [];
  }

  // Sauvegarde des préférences
  saveUserPreferences(preferences) {
    this.userPreferences = { ...this.userPreferences, ...preferences };
  }

  // Récupération des préférences
  getUserPreferences() {
    return this.userPreferences;
  }
}

export default new AIService();