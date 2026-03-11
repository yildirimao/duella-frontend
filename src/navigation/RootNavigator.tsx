import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './TabNavigator';
import { colors } from '../theme/colors';

const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <TabNavigator />

      <View style={styles.adPlaceholder}>
        <Text style={styles.adLabel}>Reklam Alani</Text>
        <Text style={styles.adText}>Bottom banner placeholder</Text>
      </View>
    </View>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  adPlaceholder: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 96,
    height: 76,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adLabel: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  adText: {
    color: colors.mutedText,
    fontSize: 12,
  },
});
