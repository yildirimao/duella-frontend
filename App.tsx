import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 15; // 15x15 grid
const CELL_SIZE = 20; // her hücre 20px
const INITIAL_SNAKE = [
  [7, 7],
  [6, 7],
  [5, 7],
]; // yılanın başlangıç pozisyonu (baş en sağda)
const INITIAL_DIRECTION = 'RIGHT';
const INITIAL_FOOD = [10, 10]; // geçici, rastgele ayarlanacak

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameInterval = useRef(null);

  // Rastgele yem oluştur (yılanın üzerinde olmayacak)
  const generateFood = (currentSnake) => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ];
    } while (currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
    return newFood;
  };

  // Oyunu başlat veya sıfırla
  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
  };

  // Yılan hareketi
  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = newSnake[0];
    let newHead;

    switch (direction) {
      case 'RIGHT':
        newHead = [head[0] + 1, head[1]];
        break;
      case 'LEFT':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'UP':
        newHead = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        newHead = [head[0], head[1] + 1];
        break;
      default:
        return;
    }

    // Çarpışma kontrolü: duvar
    if (
      newHead[0] < 0 ||
      newHead[0] >= GRID_SIZE ||
      newHead[1] < 0 ||
      newHead[1] >= GRID_SIZE
    ) {
      setGameOver(true);
      return;
    }

    // Kendine çarpma kontrolü (yeni baş hariç)
    if (snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(newHead); // yeni başı ekle

    // Yem kontrolü
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      // Yem yendi, kuyruk silinmez (yılan uzar)
      setFood(generateFood(newSnake));
      setScore(score + 1);
    } else {
      // Yem yenmedi, kuyruğu sil
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // Yön değiştirme (ters yöne izin verme)
  const changeDirection = (newDir) => {
    if (
      (direction === 'RIGHT' && newDir !== 'LEFT') ||
      (direction === 'LEFT' && newDir !== 'RIGHT') ||
      (direction === 'UP' && newDir !== 'DOWN') ||
      (direction === 'DOWN' && newDir !== 'UP')
    ) {
      setDirection(newDir);
    }
  };

  // Oyun döngüsü
  useEffect(() => {
    if (gameOver) {
      if (gameInterval.current) clearInterval(gameInterval.current);
    } else {
      gameInterval.current = setInterval(moveSnake, 200);
    }
    return () => clearInterval(gameInterval.current);
  }, [snake, direction, food, gameOver]);

  // İlk yemi oluştur
  useEffect(() => {
    setFood(generateFood(INITIAL_SNAKE));
  }, []);

  return (
    <View style={gameStyles.container}>
      {/* Skor ve oyun durumu */}
      <View style={gameStyles.header}>
        <Text style={gameStyles.score}>Skor: {score}</Text>
        {gameOver && (
          <TouchableOpacity onPress={startGame} style={gameStyles.restartButton}>
            <Text style={gameStyles.restartText}>Yeniden Başla</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Oyun alanı grid'i */}
      <View style={gameStyles.grid}>
        {Array.from({ length: GRID_SIZE }).map((_, row) => (
          <View key={row} style={gameStyles.row}>
            {Array.from({ length: GRID_SIZE }).map((_, col) => {
              const isSnake = snake.some(s => s[0] === col && s[1] === row);
              const isHead = snake[0] && snake[0][0] === col && snake[0][1] === row;
              const isFood = food[0] === col && food[1] === row;
              return (
                <View
                  key={col}
                  style={[
                    gameStyles.cell,
                    isSnake && gameStyles.snakeCell,
                    isHead && gameStyles.headCell,
                    isFood && gameStyles.foodCell,
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Yön tuşları */}
      <View style={gameStyles.controls}>
        <View style={gameStyles.controlRow}>
          <TouchableOpacity style={gameStyles.controlButton} onPress={() => changeDirection('UP')}>
            <Text style={gameStyles.controlText}>⬆️</Text>
          </TouchableOpacity>
        </View>
        <View style={gameStyles.controlRow}>
          <TouchableOpacity style={gameStyles.controlButton} onPress={() => changeDirection('LEFT')}>
            <Text style={gameStyles.controlText}>⬅️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={gameStyles.controlButton} onPress={() => changeDirection('DOWN')}>
            <Text style={gameStyles.controlText}>⬇️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={gameStyles.controlButton} onPress={() => changeDirection('RIGHT')}>
            <Text style={gameStyles.controlText}>➡️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const gameStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: GRID_SIZE * CELL_SIZE,
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  restartText: {
    color: '#fff',
    fontWeight: '600',
  },
  grid: {
    width: GRID_SIZE * CELL_SIZE,
    height: GRID_SIZE * CELL_SIZE,
    borderWidth: 2,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  snakeCell: {
    backgroundColor: '#4CAF50',
  },
  headCell: {
    backgroundColor: '#2E7D32',
  },
  foodCell: {
    backgroundColor: '#F44336',
  },
  controls: {
    marginTop: 15,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: '#ddd',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
  },
  controlText: {
    fontSize: 24,
  },
});

export default function App() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      {/* Yılan oyunu üst kısımda */}
      <SnakeGame />
      
      {/* Alt kısım: buton ve yazılar (argo ifadeler korundu) */}
      <View style={styles.bottomSection}>
        <Text style={styles.greeting}> hey corç </Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Hoşgeldiniz lan</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>Butona basma sayısı: {count}</Text>
        <Text style={styles.insult}>adam olun ulan</Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Üstten başlasın
    paddingTop: 40,
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  counterText: {
    marginTop: 20,
    fontSize: 16,
  },
  insult: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});