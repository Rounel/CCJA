import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useNavigation } from '../navigation/SimpleNavigator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Nos Activités',
    description:
      'Participez à des événements exclusifs, des ateliers de formation, des conférences et des rencontres networking pour développer vos compétences et élargir votre réseau professionnel.',
    icon: '🎯',
    color: '#007AFF',
  },
  {
    id: 2,
    title: 'Nos Valeurs',
    description:
      "L'entraide, l'excellence, l'innovation et l'intégrité sont au cœur de notre communauté. Ensemble, nous créons un environnement propice à la croissance personnelle et professionnelle.",
    icon: '💎',
    color: '#34C759',
  },
  {
    id: 3,
    title: 'Vos Avantages',
    description:
      'Accédez à des opportunités professionnelles, un mentorat personnalisé, des ressources exclusives et une communauté bienveillante prête à vous soutenir dans vos projets.',
    icon: '🚀',
    color: '#FF9500',
  },
];

export default function OnboardingScreen() {
  const { navigate } = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleGetStarted = () => {
    navigate('Login');
  };

  const handleSkip = () => {
    navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Passer</Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: slide.color + '20' }]}>
              <Text style={styles.icon}>{slide.icon}</Text>
            </View>

            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? slides[currentIndex].color : '#D1D1D6',
                width: index === currentIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Text style={styles.previousButtonText}>Précédent</Text>
          </TouchableOpacity>
        )}

        <View style={{ flex: 1 }} />

        {currentIndex < slides.length - 1 ? (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: slides[currentIndex].color }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Suivant</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: slides[currentIndex].color }]}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Commencer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 28,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    transition: 'all 0.3s',
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  previousButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  previousButtonText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
  },
  nextButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  getStartedButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  getStartedButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
