import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation, { NavigationTab } from '../components/BottomNavigation';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import PeopleScreen from '../screens/PeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminScreen';

export default function MainApp() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('Home');

  const renderScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Events':
        return <EventsScreen />;
      case 'People':
        return <PeopleScreen />;
      case 'Profile':
        return <ProfileScreen />;
      case 'Admin':
        return <AdminScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
