import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Tipler
type GameMode = {
  id: string;
  name: string;
};

type Player = {
  id: string;
  name: string;
  avatar: string;
  tags: string[];
  mutualFriends: number;
};

// Örnek veriler
const gameModes: GameMode[] = [
  { id: '1', name: 'Klasik' },
  { id: '2', name: 'Canlı 3' },
  { id: '3', name: 'Yeni Oyun' },
];

const categories: string[] = ['Tüm', 'Öneriler'];

const suggestedPlayers: Player[] = [
  {
    id: '1',
    name: 'snow.woman',
    avatar: 'https://i.pravatar.cc/100?u=1',
    tags: ['#Senin için'],
    mutualFriends: 2,
  },
  {
    id: '2',
    name: 'candyyygirl',
    avatar: 'https://i.pravatar.cc/100?u=2',
    tags: ['#ŞimdiÇevrimiçi', '#Senin için'],
    mutualFriends: 0,
  },
  {
    id: '3',
    name: 'bkemuk',
    avatar: 'https://i.pravatar.cc/100?u=3',
    tags: ['#Benzerİstatistiği'],
    mutualFriends: 1,
  },
];

// Alt bileşenler
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Bir oyuncu arayın</Text>
    <TouchableOpacity>
      <Ionicons name="search" size={24} color="#333" />
    </TouchableOpacity>
  </View>
);

const PrimeBanner = () => (
  <View style={styles.banner}>
    <View>
      <Text style={styles.bannerTitle}>PRIME</Text>
      <Text style={styles.bannerSubtitle}>Ücretsiz deneme</Text>
    </View>
    <TouchableOpacity style={styles.bannerButton}>
      <Text style={styles.bannerButtonText}>Dene</Text>
    </TouchableOpacity>
  </View>
);

const GameModes = () => (
  <View style={styles.gameModesContainer}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {gameModes.map((mode) => (
        <TouchableOpacity key={mode.id} style={styles.gameModeChip}>
          <Text style={styles.gameModeText}>{mode.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tüm');
  return (
    <View style={styles.categoryContainer}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.categoryTab,
            selectedCategory === cat && styles.categoryTabActive,
          ]}
          onPress={() => setSelectedCategory(cat)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === cat && styles.categoryTextActive,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

type PlayerCardProps = {
  player: Player;
};

const PlayerCard = ({ player }: PlayerCardProps) => (
  <View style={styles.playerCard}>
    <Image source={{ uri: player.avatar }} style={styles.avatar} />
    <View style={styles.playerInfo}>
      <Text style={styles.playerName}>{player.name}</Text>
      {player.mutualFriends > 0 && (
        <Text style={styles.mutualFriends}>{player.mutualFriends} ortak arkadaş</Text>
      )}
      <View style={styles.tagsContainer}>
        {player.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
    <TouchableOpacity style={styles.inviteButton}>
      <Text style={styles.inviteButtonText}>Davet Et</Text>
    </TouchableOpacity>
  </View>
);

const PlayersList = () => (
  <FlatList
    data={suggestedPlayers}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <PlayerCard player={item} />}
    contentContainerStyle={styles.listContainer}
    showsVerticalScrollIndicator={false}
    scrollEnabled={false} // ScrollView içinde olduğu için
  />
);

// Ana bileşen
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PrimeBanner />
        <GameModes />
        <CategoryTabs />
        <PlayersList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  banner: {
    backgroundColor: '#6c5ce7',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
  bannerButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  bannerButtonText: {
    color: '#6c5ce7',
    fontWeight: 'bold',
  },
  gameModesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gameModeChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gameModeText: {
    color: '#333',
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryTabActive: {
    backgroundColor: '#6c5ce7',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  playerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  playerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  mutualFriends: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
  },
  inviteButton: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;