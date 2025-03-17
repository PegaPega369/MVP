// Theme colors and styles for Digital Gold components
export const COLORS = {
    primary: '#6A0DAD',        // Blueish Purple (Main Theme Color)
    primaryDark: '#4B0082',    // Dark Indigo Purple
    secondary: '#5A1ABF',      // Deep Purple with Blue Tint
    accent: '#FF6B6B',         // Coral Red (For Important Accents)
    
    background: '#000000',     // Black (Dark Mode Background)
    cardBg: '#1A1A2E',         // Deep Blueish Gray (For Cards)
    
    text: '#FFFFFF',           // White (Primary Text)
    textSecondary: '#B0B3C1',  // Cool Light Gray (Secondary Text)
    textLight: '#8888A3',      // Muted Blueish Gray (For Less Important Text)
    
    success: '#4CAF50',        // Success Green
    warning: '#FF9800',        // Warning Orange
    error: '#F44336',          // Error Red
    border: '#292A3A',         // Dark Bluish Border
    shield: '#3498db',

    // Chart Colors
    chartLine: '#6A0DAD', // Blueish Purple Line
    chartGradient: ['rgba(106, 13, 173, 0.8)', 'rgba(106, 13, 173, 0.1)'], // Smooth Blue-Purple Gradient

    // Gradient Backgrounds
    purpleGradient: ['#6A0DAD', '#4B0082'],  // Deep Blue-Purple Gradient
    darkGradient: ['#0F0F1D', '#1C1C3C'],   // Dark Bluish Gradient for Backgrounds
};

// Shadow styles for cards & elements
export const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
};
