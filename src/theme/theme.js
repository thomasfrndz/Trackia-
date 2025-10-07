import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6366f1', // Indigo
    secondary: '#ec4899', // Pink
    accent: '#f59e0b', // Amber
    background: '#f8fafc', // Slate 50
    surface: '#ffffff',
    text: '#1e293b', // Slate 800
    onSurface: '#64748b', // Slate 500
    disabled: '#cbd5e1', // Slate 300
    placeholder: '#94a3b8', // Slate 400
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#ef4444', // Red 500
    success: '#10b981', // Emerald 500
    warning: '#f59e0b', // Amber 500
    error: '#ef4444', // Red 500
    // Custom colors
    gradient: {
      primary: ['#6366f1', '#8b5cf6'],
      secondary: ['#ec4899', '#f97316'],
      success: ['#10b981', '#059669'],
      warning: ['#f59e0b', '#d97706'],
    },
    workout: {
      cardio: '#ef4444', // Red
      strength: '#3b82f6', // Blue
      flexibility: '#10b981', // Green
      balance: '#8b5cf6', // Purple
    }
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
  roundness: 12,
};