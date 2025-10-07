export const exercises = [
  // CARDIO
  {
    id: 1,
    name: "Course à pied",
    category: "cardio",
    difficulty: "Débutant",
    duration: 30,
    calories: 300,
    description: "Course d'endurance pour améliorer la condition cardiovasculaire",
    instructions: [
      "Échauffez-vous 5 minutes en marchant",
      "Maintenez un rythme confortable",
      "Respirez régulièrement par le nez et la bouche",
      "Hydratez-vous régulièrement"
    ],
    tips: [
      "Portez des chaussures de course adaptées",
      "Écoutez votre corps et ajustez l'intensité",
      "Variez les parcours pour éviter la monotonie"
    ],
    muscles: ["Jambes", "Fessiers", "Cardiovasculaire"],
    equipment: "Aucun",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
  },
  {
    id: 2,
    name: "Saut à la corde",
    category: "cardio",
    difficulty: "Intermédiaire",
    duration: 15,
    calories: 200,
    description: "Exercice cardio intense pour brûler les calories rapidement",
    instructions: [
      "Tenez la corde avec les poignées à hauteur des hanches",
      "Sautez en gardant les genoux légèrement fléchis",
      "Atterrissez sur la pointe des pieds",
      "Maintenez un rythme régulier"
    ],
    tips: [
      "Commencez lentement et augmentez progressivement",
      "Gardez les coudes près du corps",
      "Regardez droit devant vous"
    ],
    muscles: ["Mollets", "Épaules", "Cardiovasculaire"],
    equipment: "Corde à sauter",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400",
  },
  {
    id: 3,
    name: "Burpees",
    category: "cardio",
    difficulty: "Avancé",
    duration: 10,
    calories: 150,
    description: "Exercice complet combinant cardio et musculation",
    instructions: [
      "Commencez debout, pieds écartés largeur des épaules",
      "Accroupissez-vous et posez les mains au sol",
      "Sautez les pieds en arrière en position de planche",
      "Faites une pompe",
      "Sautez les pieds vers les mains",
      "Sautez en l'air avec les bras levés"
    ],
    tips: [
      "Maintenez le rythme pour maximiser l'effet cardio",
      "Gardez le dos droit pendant la planche",
      "Atterrissez en douceur"
    ],
    muscles: ["Tout le corps", "Cardiovasculaire"],
    equipment: "Aucun",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
  },

  // MUSCULATION
  {
    id: 4,
    name: "Squats",
    category: "strength",
    difficulty: "Débutant",
    duration: 20,
    calories: 100,
    description: "Exercice fondamental pour les jambes et les fessiers",
    instructions: [
      "Tenez-vous debout, pieds écartés largeur des épaules",
      "Descendez comme pour vous asseoir sur une chaise",
      "Gardez le dos droit et les genoux alignés avec les orteils",
      "Descendez jusqu'à ce que les cuisses soient parallèles au sol",
      "Remontez en contractant les fessiers"
    ],
    tips: [
      "Ne laissez pas les genoux dépasser les orteils",
      "Gardez le poids sur les talons",
      "Regardez droit devant vous"
    ],
    muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
    equipment: "Aucun",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400",
  },
  {
    id: 5,
    name: "Pompes",
    category: "strength",
    difficulty: "Intermédiaire",
    duration: 15,
    calories: 80,
    description: "Exercice classique pour le haut du corps",
    instructions: [
      "Placez-vous en position de planche",
      "Mains écartées largeur des épaules",
      "Descendez en fléchissant les bras",
      "Gardez le corps aligné de la tête aux pieds",
      "Remontez en poussant sur les bras"
    ],
    tips: [
      "Gardez le corps rigide comme une planche",
      "Ne laissez pas les hanches s'affaisser",
      "Respirez en montant, expirez en descendant"
    ],
    muscles: ["Pectoraux", "Triceps", "Deltoïdes"],
    equipment: "Aucun",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
  },
  {
    id: 6,
    name: "Développé couché",
    category: "strength",
    difficulty: "Avancé",
    duration: 25,
    calories: 120,
    description: "Exercice de musculation pour les pectoraux avec barre",
    instructions: [
      "Allongez-vous sur un banc de développé",
      "Saisissez la barre avec une prise légèrement plus large que les épaules",
      "Descendez la barre vers la poitrine de manière contrôlée",
      "Poussez la barre vers le haut sans verrouiller les coudes",
      "Gardez les pieds bien ancrés au sol"
    ],
    tips: [
      "Contrôlez la descente sur 2-3 secondes",
      "Ne rebondissez pas sur la poitrine",
      "Gardez les omoplates serrées"
    ],
    muscles: ["Pectoraux", "Triceps", "Deltoïdes antérieurs"],
    equipment: "Barre, banc, poids",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400",
  },

  // FLEXIBILITÉ
  {
    id: 7,
    name: "Étirements des ischio-jambiers",
    category: "flexibility",
    difficulty: "Débutant",
    duration: 10,
    calories: 20,
    description: "Étirement pour améliorer la flexibilité des jambes",
    instructions: [
      "Asseyez-vous au sol, jambes tendues devant vous",
      "Penchez-vous vers l'avant en gardant le dos droit",
      "Attrapez vos pieds ou chevilles si possible",
      "Maintenez la position 30 secondes",
      "Respirez profondément"
    ],
    tips: [
      "Ne forcez pas l'étirement",
      "Allez jusqu'à la tension, pas la douleur",
      "Gardez les genoux légèrement fléchis si nécessaire"
    ],
    muscles: ["Ischio-jambiers", "Lombaires"],
    equipment: "Aucun",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  },
  {
    id: 8,
    name: "Position du chien tête en bas",
    category: "flexibility",
    difficulty: "Intermédiaire",
    duration: 5,
    calories: 15,
    description: "Posture de yoga pour étirer tout le corps",
    instructions: [
      "Commencez à quatre pattes",
      "Plantez les orteils et soulevez les hanches",
      "Formez un V inversé avec votre corps",
      "Gardez les bras tendus et les jambes droites",
      "Maintenez la position en respirant profondément"
    ],
    tips: [
      "Gardez les mains écartées largeur des épaules",
      "Poussez les hanches vers le haut",
      "Relaxez la nuque"
    ],
    muscles: ["Épaules", "Mollets", "Ischio-jambiers", "Lombaires"],
    equipment: "Aucun",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  },

  // ÉQUILIBRE
  {
    id: 9,
    name: "Planche sur une jambe",
    category: "balance",
    difficulty: "Intermédiaire",
    duration: 15,
    calories: 50,
    description: "Exercice d'équilibre et de gainage",
    instructions: [
      "Commencez en position de planche",
      "Levez une jambe en gardant le corps aligné",
      "Maintenez la position 30 secondes",
      "Changez de jambe",
      "Gardez les hanches parallèles au sol"
    ],
    tips: [
      "Engagez les abdominaux",
      "Ne laissez pas les hanches tourner",
      "Regardez vers le sol"
    ],
    muscles: ["Abdominaux", "Fessiers", "Épaules"],
    equipment: "Aucun",
    image: "https://images.unsplash.com/photo-1506629905607-0b2b4a2b4b4b?w=400",
  },
  {
    id: 10,
    name: "Fente bulgare",
    category: "balance",
    difficulty: "Avancé",
    duration: 20,
    calories: 80,
    description: "Exercice d'équilibre et de force pour les jambes",
    instructions: [
      "Placez le pied arrière sur une surface surélevée",
      "Descendez en fléchissant la jambe avant",
      "Gardez le genou aligné avec la cheville",
      "Remontez en poussant sur le talon avant",
      "Maintenez l'équilibre tout au long du mouvement"
    ],
    tips: [
      "Gardez le torse droit",
      "Ne laissez pas le genou dépasser l'orteil",
      "Contrôlez la descente"
    ],
    muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
    equipment: "Banc ou chaise",
    image: "https://images.unsplash.com/photo-1506629905607-0b2b4a2b4b4b?w=400",
  },
];

export const workoutPlans = [
  {
    id: 1,
    name: "Débutant - Cardio Doux",
    category: "cardio",
    difficulty: "Débutant",
    duration: 30,
    calories: 200,
    description: "Programme d'introduction au cardio pour débutants",
    exercises: [1, 7], // Course à pied + Étirements
    instructions: [
      "Échauffement : 5 minutes de marche",
      "Course lente : 15 minutes",
      "Récupération : 5 minutes de marche",
      "Étirements : 5 minutes"
    ],
    frequency: "3 fois par semaine",
    goals: ["Améliorer l'endurance", "Perdre du poids", "Se remettre en forme"],
  },
  {
    id: 2,
    name: "Intermédiaire - HIIT Intense",
    category: "cardio",
    difficulty: "Intermédiaire",
    duration: 25,
    calories: 350,
    description: "Entraînement par intervalles à haute intensité",
    exercises: [2, 3, 4], // Saut à la corde + Burpees + Squats
    instructions: [
      "Échauffement : 5 minutes",
      "4 cycles de 4 minutes :",
      "  - 30s saut à la corde intense",
      "  - 30s burpees",
      "  - 30s squats rapides",
      "  - 2min30s récupération",
      "Étirements : 5 minutes"
    ],
    frequency: "4 fois par semaine",
    goals: ["Brûler les calories", "Améliorer la condition", "Défis personnels"],
  },
  {
    id: 3,
    name: "Musculation Complète",
    category: "strength",
    difficulty: "Intermédiaire",
    duration: 45,
    calories: 300,
    description: "Séance complète de musculation pour tout le corps",
    exercises: [4, 5, 6], // Squats + Pompes + Développé couché
    instructions: [
      "Échauffement : 10 minutes",
      "3 séries de 12-15 répétitions pour chaque exercice",
      "Récupération : 1-2 minutes entre les séries",
      "Étirements : 10 minutes"
    ],
    frequency: "3 fois par semaine",
    goals: ["Développer la force", "Gagner en masse musculaire", "Tonifier"],
  },
  {
    id: 4,
    name: "Yoga Flow",
    category: "flexibility",
    difficulty: "Débutant",
    duration: 30,
    calories: 100,
    description: "Séquence de yoga pour la flexibilité et la relaxation",
    exercises: [7, 8], // Étirements + Chien tête en bas
    instructions: [
      "Méditation : 5 minutes",
      "Séquence de postures de yoga",
      "Étirements profonds",
      "Relaxation finale : 5 minutes"
    ],
    frequency: "Quotidien",
    goals: ["Améliorer la flexibilité", "Réduire le stress", "Équilibre mental"],
  },
  {
    id: 5,
    name: "Équilibre et Stabilité",
    category: "balance",
    difficulty: "Intermédiaire",
    duration: 20,
    calories: 120,
    description: "Exercices d'équilibre pour améliorer la stabilité",
    exercises: [9, 10], // Planche sur une jambe + Fente bulgare
    instructions: [
      "Échauffement : 5 minutes",
      "Exercices d'équilibre progressifs",
      "Travail de la proprioception",
      "Étirements spécifiques"
    ],
    frequency: "3 fois par semaine",
    goals: ["Améliorer l'équilibre", "Prévenir les blessures", "Stabilité"],
  },
];

export const aiWorkoutGenerator = {
  generateWorkout: (userLevel, goals, availableTime, preferences) => {
    // Logique de génération d'entraînement personnalisé par l'IA
    const filteredExercises = exercises.filter(exercise => {
      return exercise.difficulty === userLevel || 
             (userLevel === "Débutant" && exercise.difficulty === "Intermédiaire") ||
             (userLevel === "Intermédiaire" && exercise.difficulty === "Avancé");
    });

    const selectedExercises = filteredExercises
      .filter(exercise => goals.includes(exercise.category))
      .slice(0, Math.min(6, Math.floor(availableTime / 5)));

    const totalDuration = selectedExercises.reduce((sum, ex) => sum + ex.duration, 0);
    const totalCalories = selectedExercises.reduce((sum, ex) => sum + ex.calories, 0);

    return {
      id: Date.now(),
      name: `Entraînement IA - ${userLevel}`,
      category: goals[0] || "cardio",
      difficulty: userLevel,
      duration: totalDuration,
      calories: totalCalories,
      description: `Entraînement personnalisé généré par l'IA basé sur vos préférences`,
      exercises: selectedExercises.map(ex => ex.id),
      aiGenerated: true,
      instructions: selectedExercises.map((ex, index) => 
        `${index + 1}. ${ex.name} - ${ex.duration} minutes`
      ),
    };
  },

  getRecommendations: (userHistory, currentGoals) => {
    // Logique de recommandations basée sur l'historique et les objectifs
    return {
      suggestedWorkouts: workoutPlans.filter(plan => 
        currentGoals.some(goal => plan.goals.includes(goal))
      ),
      tips: [
        "Variez vos entraînements pour éviter la monotonie",
        "Écoutez votre corps et ajustez l'intensité",
        "La récupération est aussi importante que l'entraînement",
        "Hydratez-vous bien avant, pendant et après l'exercice"
      ],
      nextWorkout: "Cardio HIIT - 25 minutes",
      motivation: "Vous progressez bien ! Continuez sur cette lancée ! 💪"
    };
  }
};