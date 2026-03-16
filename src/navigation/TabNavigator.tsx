import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RewardScreen from '../screens/RewardScreen';
import { colors } from '../theme/colors';

export type RootTabParamList = {
  Home: undefined;
  Game: undefined;
  Reward: undefined;
  Profile: undefined;
};

const tabScreenOptions = ({ route }: { route: { name: string } }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Game') {
      iconName = focused ? 'game-controller' : 'game-controller-outline';
    } else if (route.name === 'Reward') {
      iconName = focused ? 'trophy' : 'trophy-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
    } else {
      iconName = 'help-circle-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.tabInactive,
  tabBarStyle: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
    position: 'absolute' as const,
    left: 16,
    right: 16,
    bottom: 20,
    borderRadius: 22,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
});

const TabNavigation = createStaticNavigation(
  createBottomTabNavigator({
    screenOptions: tabScreenOptions,
    screens: {
      Home: {
        screen: HomeScreen,
        options: { title: 'Ana Sayfa' },
      },
      Game: {
        screen: GameScreen,
        options: { title: 'Oyun' },
      },
      Reward: {
        screen: RewardScreen,
        options: { title: 'Ödüller' },
      },
      Profile: {
        screen: ProfileScreen,
        options: { title: 'Profil' },
      },
    },
  })
);

const TabNavigator = () => {
  return <TabNavigation />;
};

export default TabNavigator;
