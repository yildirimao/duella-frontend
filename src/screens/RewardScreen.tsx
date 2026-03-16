import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

const RewardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Odul Ekrani</Text>
    </SafeAreaView>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
});