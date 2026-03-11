import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const gameModes = [
  {
    title: '1v1 Duello',
    subtitle: 'Klasik Eslestirme',
    description: 'Tek bir rakibe karsi kafa kafaya oyna, en yuksek skoru yap.',
    icon: 'people-outline' as const,
    iconColor: colors.secondary,
  },
  {
    title: 'Zamana Karsi Yaris',
    subtitle: 'Hiz ve Dogruluk',
    description: 'Sure dolmadan sorulari bitir, seri cevaplarla puan carpani yakala.',
    icon: 'timer-outline' as const,
    iconColor: colors.accent,
  },
  {
    title: 'Coklu Duello',
    subtitle: '1v1 Formatinda Turnuva',
    description: 'Birden fazla oyuncunun katildigi eslesmelerde tur atla, finale kadar ilerle.',
    icon: 'git-network-outline' as const,
    iconColor: colors.primary,
  },
];

const HomeScreen = () => {
  const [isModeFlyoutVisible, setIsModeFlyoutVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Duella Quiz</Text>
          <Text style={styles.pageSubtitle}>KPSS</Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Bilgini konuştur</Text>
          <Text style={styles.heroSubtitle}>
            Günlük quizlere katıl, puan topla, sıralamada yüksel.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => setIsModeFlyoutVisible(true)}
          >
            <Text style={styles.heroButtonText}>Hemen Başla</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Ionicons name="flash" size={22} color={colors.white} />
            <Text style={styles.statValue}>2450</Text>
            <Text style={styles.statLabel}>Toplam Puan</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.secondary }]}>
            <Ionicons name="trophy" size={22} color={colors.black} />
            <Text style={[styles.statValue, { color: colors.black }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.black }]}>
              Kazanılan Rozet
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Hızlı Erişim</Text>

        <View style={styles.quickGrid}>
          <TouchableOpacity style={styles.quickCard}>
            <Ionicons name="play-circle" size={28} color={colors.accent} />
            <Text style={styles.quickTitle}>Hızlı Oyun</Text>
            <Text style={styles.quickText}>Anında quiz başlat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard}>
            <Ionicons name="people" size={28} color={colors.secondary} />
            <Text style={styles.quickTitle}>Düello</Text>
            <Text style={styles.quickText}>Rakiple yarış</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard}>
            <Ionicons name="gift" size={28} color={colors.primary} />
            <Text style={styles.quickTitle}>Ödüller</Text>
            <Text style={styles.quickText}>Görevleri tamamla</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard}>
            <Ionicons name="stats-chart" size={28} color={colors.accent} />
            <Text style={styles.quickTitle}>İstatistik</Text>
            <Text style={styles.quickText}>Performansını gör</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={isModeFlyoutVisible}
        onRequestClose={() => setIsModeFlyoutVisible(false)}
      >
        <Pressable
          style={styles.flyoutOverlay}
          onPress={() => setIsModeFlyoutVisible(false)}
        >
          <Pressable style={styles.flyoutSheet}>
            <View style={styles.flyoutHandle} />

            <View style={styles.flyoutHeader}>
              <View>
                <Text style={styles.flyoutTitle}>Oyun Modu Sec</Text>
                <Text style={styles.flyoutSubtitle}>
                  Sana uygun modu sec ve hemen oyuna gir.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.flyoutCloseButton}
                onPress={() => setIsModeFlyoutVisible(false)}
              >
                <Ionicons name="close" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>

            {gameModes.map((mode) => (
              <TouchableOpacity key={mode.title} style={styles.modeCard}>
                <View style={styles.modeHeader}>
                  <View style={styles.modeCopy}>
                    <Text style={styles.modeTitle}>{mode.title}</Text>
                    <Text style={styles.modeSubtitle}>{mode.subtitle}</Text>
                  </View>

                  <View style={styles.modeIconBadge}>
                    <Ionicons name={mode.icon} size={22} color={mode.iconColor} />
                  </View>
                </View>

                <Text style={styles.modeText}>{mode.description}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    paddingTop: 36,
    paddingBottom: 220,
  },
  pageHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pageTitle: {
    color: colors.white,
    fontFamily: 'LilitaOne',
    fontSize: 42,
    textAlign: 'center',
    lineHeight: 46,
    letterSpacing: 0.5,
  },
  pageSubtitle: {
    color: colors.accent,
    fontFamily: 'LilitaOne',
    fontSize: 24,
    letterSpacing: 1.5,
    marginTop: 2,
    textAlign: 'center',
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  heroButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  statValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
  },
  statLabel: {
    color: colors.white,
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 6,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
  },
  quickText: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
  flyoutOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(17, 17, 17, 0.45)',
  },
  flyoutSheet: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
    marginTop: 72,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  flyoutHandle: {
    alignSelf: 'center',
    width: 54,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.tabInactive,
    marginBottom: 18,
  },
  flyoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  flyoutTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  flyoutSubtitle: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 240,
  },
  flyoutCloseButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modeCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  modeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  modeCopy: {
    flex: 1,
    paddingRight: 12,
  },
  modeTitle: {
    color: colors.accent,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  modeSubtitle: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  modeIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeText: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
});
