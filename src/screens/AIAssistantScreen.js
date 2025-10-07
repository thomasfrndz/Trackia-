import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Chip,
  List,
  FAB,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AIAssistantScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const quickQuestions = [
    "Comment améliorer ma forme physique ?",
    "Quel régime alimentaire me conseillez-vous ?",
    "Comment éviter les blessures ?",
    "Quel est le meilleur moment pour s'entraîner ?",
    "Comment récupérer plus rapidement ?",
    "Quels exercices pour les abdos ?",
  ];

  const aiPersonalities = [
    {
      id: 'coach',
      name: 'Coach Sportif',
      icon: 'fitness',
      color: '#3b82f6',
      description: 'Expert en entraînement et performance',
    },
    {
      id: 'nutritionist',
      name: 'Nutritionniste',
      icon: 'nutrition',
      color: '#10b981',
      description: 'Spécialiste en alimentation sportive',
    },
    {
      id: 'physio',
      name: 'Kinésithérapeute',
      icon: 'medical',
      color: '#8b5cf6',
      description: 'Expert en récupération et prévention',
    },
    {
      id: 'motivator',
      name: 'Motivateur',
      icon: 'flame',
      color: '#ef4444',
      description: 'Boostez votre motivation',
    },
  ];

  useEffect(() => {
    // Message de bienvenue
    addAIMessage(
      "Bonjour ! Je suis votre assistant IA personnel. Je peux vous aider avec vos entraînements, votre nutrition, la récupération et bien plus encore. Que puis-je faire pour vous aujourd'hui ?",
      'welcome'
    );
  }, []);

  const addAIMessage = (text, type = 'ai') => {
    const newMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      type: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateAIResponse = async (userMessage) => {
    setIsLoading(true);
    
    try {
      // Simulation de la réponse IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Réponses simulées basées sur le contenu du message
      const responses = {
        'forme physique': "Pour améliorer votre forme physique, je recommande de combiner cardio et musculation. Commencez par 3 séances par semaine avec des exercices variés. L'important est la régularité !",
        'régime': "Une alimentation équilibrée est cruciale ! Privilégiez les protéines maigres, les glucides complexes et les bonnes graisses. Hydratez-vous bien et mangez 5-6 petits repas par jour.",
        'blessures': "Pour éviter les blessures : échauffez-vous toujours, progressez graduellement, écoutez votre corps, et n'oubliez pas les étirements. La récupération est aussi importante que l'entraînement !",
        'moment': "Le meilleur moment dépend de votre rythme ! Certains préfèrent le matin pour l'énergie, d'autres le soir pour déstresser. L'important est de trouver votre créneau et de s'y tenir.",
        'récupération': "Pour une meilleure récupération : dormez 7-9h, hydratez-vous, étirez-vous, mangez des protéines post-workout, et prenez des jours de repos. Votre corps a besoin de temps pour se reconstruire !",
        'abdos': "Pour des abdos toniques : planche, crunchs, mountain climbers, et bicycle crunches. Variez les exercices et travaillez aussi les obliques. La clé : la régularité et une bonne technique !",
      };

      let response = "Merci pour votre question ! Je suis là pour vous accompagner dans votre parcours sportif. N'hésitez pas à me poser des questions plus spécifiques.";
      
      // Recherche de mots-clés dans le message
      const lowerMessage = userMessage.toLowerCase();
      for (const [keyword, aiResponse] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
          response = aiResponse;
          break;
        }
      }

      addAIMessage(response);
    } catch (error) {
      addAIMessage("Désolé, j'ai rencontré un problème. Pouvez-vous reformuler votre question ?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    addUserMessage(inputText);
    setInputText('');
    
    // Scroll vers le bas
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    await generateAIResponse(inputText);
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  const handlePersonalitySelect = (personality) => {
    addAIMessage(
      `Parfait ! Je passe en mode ${personality.name}. ${personality.description}. Comment puis-je vous aider ?`,
      'personality'
    );
  };

  const renderMessage = (message) => {
    const isUser = message.type === 'user';
    const isWelcome = message.type === 'welcome';
    const isPersonality = message.type === 'personality';

    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser && styles.userMessageContainer,
        ]}
      >
        <Card
          style={[
            styles.messageCard,
            isUser && styles.userMessageCard,
            isWelcome && styles.welcomeMessageCard,
            isPersonality && styles.personalityMessageCard,
          ]}
        >
          <Card.Content>
            <View style={styles.messageHeader}>
              {!isUser && (
                <Ionicons
                  name="brain"
                  size={20}
                  color={isWelcome ? '#6366f1' : isPersonality ? '#10b981' : '#8b5cf6'}
                />
              )}
              <Text style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
            <Text
              style={[
                styles.messageText,
                isUser && styles.userMessageText,
                isWelcome && styles.welcomeMessageText,
                isPersonality && styles.personalityMessageText,
              ]}
            >
              {message.text}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#8b5cf6', '#a855f7']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Title style={styles.headerTitle}>Assistant IA</Title>
          <Paragraph style={styles.headerSubtitle}>
            Votre coach personnel intelligent
          </Paragraph>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Card style={styles.loadingCard}>
                <Card.Content>
                  <View style={styles.loadingContent}>
                    <Ionicons name="brain" size={20} color="#8b5cf6" />
                    <Text style={styles.loadingText}>L'IA réfléchit...</Text>
                  </View>
                </Card.Content>
              </Card>
            </View>
          )}
        </ScrollView>

        {/* Questions rapides */}
        {messages.length <= 1 && (
          <Card style={styles.quickQuestionsCard}>
            <Card.Content>
              <Title style={styles.quickQuestionsTitle}>Questions populaires</Title>
              <View style={styles.quickQuestionsGrid}>
                {quickQuestions.map((question, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onPress={() => handleQuickQuestion(question)}
                    style={styles.quickQuestionChip}
                    textStyle={styles.quickQuestionText}
                  >
                    {question}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Personnalités IA */}
        <Card style={styles.personalitiesCard}>
          <Card.Content>
            <Title style={styles.personalitiesTitle}>Choisissez votre expert</Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {aiPersonalities.map((personality) => (
                <Card
                  key={personality.id}
                  style={[styles.personalityCard, { borderLeftColor: personality.color }]}
                  onPress={() => handlePersonalitySelect(personality)}
                >
                  <Card.Content style={styles.personalityContent}>
                    <Ionicons name={personality.icon} size={24} color={personality.color} />
                    <Text style={styles.personalityName}>{personality.name}</Text>
                    <Text style={styles.personalityDesc}>{personality.description}</Text>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Posez votre question..."
            mode="outlined"
            multiline
            style={styles.textInput}
            right={
              <TextInput.Icon
                icon="send"
                onPress={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
              />
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
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
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 10,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  messageCard: {
    maxWidth: '80%',
    borderRadius: 16,
    elevation: 2,
  },
  userMessageCard: {
    backgroundColor: '#6366f1',
    marginLeft: '20%',
  },
  welcomeMessageCard: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  personalityMessageCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#1e293b',
  },
  userMessageText: {
    color: 'white',
  },
  welcomeMessageText: {
    color: '#1e40af',
    fontWeight: '500',
  },
  personalityMessageText: {
    color: '#166534',
    fontWeight: '500',
  },
  loadingContainer: {
    marginBottom: 10,
  },
  loadingCard: {
    maxWidth: '80%',
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#f8fafc',
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  quickQuestionsCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  quickQuestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e293b',
  },
  quickQuestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickQuestionChip: {
    marginBottom: 10,
    width: '48%',
  },
  quickQuestionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  personalitiesCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  personalitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e293b',
  },
  personalityCard: {
    width: 140,
    marginRight: 10,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  personalityContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  personalityName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
    color: '#1e293b',
  },
  personalityDesc: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    maxHeight: 100,
  },
});