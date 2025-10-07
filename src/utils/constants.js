// Constantes de l'application
export const APP_CONFIG = {
  name: 'Sport Coaching IA',
  version: '1.0.0',
  subscriptionPrice: 6.99,
  currency: 'EUR',
  subscriptionPeriod: 'month',
};

export const COLORS = {
  primary: '#6366f1',
  secondary: '#ec4899',
  accent: '#f59e0b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  disabled: '#cbd5e1',
};

export const WORKOUT_CATEGORIES = {
  cardio: {
    name: 'Cardio',
    color: '#ef4444',
    icon: 'heart',
  },
  strength: {
    name: 'Musculation',
    color: '#3b82f6',
    icon: 'fitness',
  },
  flexibility: {
    name: 'Flexibilité',
    color: '#10b981',
    icon: 'leaf',
  },
  balance: {
    name: 'Équilibre',
    color: '#8b5cf6',
    icon: 'walk',
  },
};

export const DIFFICULTY_LEVELS = {
  'Débutant': {
    color: '#10b981',
    description: 'Parfait pour commencer',
  },
  'Intermédiaire': {
    color: '#f59e0b',
    description: 'Niveau modéré',
  },
  'Avancé': {
    color: '#ef4444',
    description: 'Pour les experts',
  },
};

export const AI_PERSONALITIES = {
  coach: {
    name: 'Coach Sportif',
    icon: 'fitness',
    color: '#3b82f6',
    description: 'Expert en entraînement et performance',
  },
  nutritionist: {
    name: 'Nutritionniste',
    icon: 'nutrition',
    color: '#10b981',
    description: 'Spécialiste en alimentation sportive',
  },
  physio: {
    name: 'Kinésithérapeute',
    icon: 'medical',
    color: '#8b5cf6',
    description: 'Expert en récupération et prévention',
  },
  motivator: {
    name: 'Motivateur',
    icon: 'flame',
    color: '#ef4444',
    description: 'Boostez votre motivation',
  },
};

export const QUICK_QUESTIONS = [
  "Comment améliorer ma forme physique ?",
  "Quel régime alimentaire me conseillez-vous ?",
  "Comment éviter les blessures ?",
  "Quel est le meilleur moment pour s'entraîner ?",
  "Comment récupérer plus rapidement ?",
  "Quels exercices pour les abdos ?",
];

export const NOTIFICATION_TYPES = {
  workout: {
    title: 'Rappels d\'entraînement',
    description: 'Recevez des notifications pour vos séances',
    icon: 'fitness',
    color: '#3b82f6',
  },
  nutrition: {
    title: 'Conseils nutrition',
    description: 'Tips et conseils alimentaires personnalisés',
    icon: 'nutrition',
    color: '#10b981',
  },
  progress: {
    title: 'Progrès et objectifs',
    description: 'Mises à jour sur vos performances',
    icon: 'trending-up',
    color: '#f59e0b',
  },
  ai: {
    title: 'Assistant IA',
    description: 'Conseils et rappels de l\'IA',
    icon: 'brain',
    color: '#8b5cf6',
  },
};

export const CHART_CONFIG = {
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

export const STORAGE_KEYS = {
  authToken: 'authToken',
  userData: 'userData',
  subscription: 'subscription',
  subscriptionPlan: 'subscriptionPlan',
  subscriptionDate: 'subscriptionDate',
  workoutHistory: 'workoutHistory',
  userPreferences: 'userPreferences',
  notifications: 'notifications',
};

export const API_ENDPOINTS = {
  // Simulation d'endpoints API
  login: '/api/auth/login',
  register: '/api/auth/register',
  subscription: '/api/subscription',
  workouts: '/api/workouts',
  progress: '/api/progress',
  ai: '/api/ai',
};

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 6,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
};

export const WORKOUT_GOALS = [
  'Perdre du poids',
  'Gagner en masse musculaire',
  'Améliorer l\'endurance',
  'Tonifier le corps',
  'Améliorer la flexibilité',
  'Renforcer l\'équilibre',
  'Réduire le stress',
  'Se remettre en forme',
];

export const ACHIEVEMENTS = [
  {
    id: 'first_workout',
    title: 'Premier pas',
    description: 'Complétez votre premier entraînement',
    icon: 'trophy',
    color: '#f59e0b',
  },
  {
    id: 'week_streak',
    title: 'Série de 7 jours',
    description: 'Entraînement consécutif pendant une semaine',
    icon: 'flame',
    color: '#ef4444',
  },
  {
    id: 'calories_1000',
    title: '1000 calories',
    description: 'Brûlez 1000 calories en une semaine',
    icon: 'flame',
    color: '#ec4899',
  },
  {
    id: 'month_workouts',
    title: 'Mois complet',
    description: '20 entraînements en un mois',
    icon: 'calendar',
    color: '#10b981',
  },
  {
    id: 'ai_questions',
    title: 'Curieux',
    description: 'Posez 10 questions à l\'IA',
    icon: 'brain',
    color: '#8b5cf6',
  },
];