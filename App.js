import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient' 
import { useFonts } from 'expo-font'
// import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {

  const [ userNumber, setUserNumber ] = useState()
  const [ gameIsOver, setGameIsOver ] = useState(true)
  const [ guessRounds, setGuessRounds ] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  // if (!fontsLoaded) {
  //   return <AppLoading />
  // }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  // if (!fontsLoaded) {
  //   SplashScreen.hideAsync()
  // }

  // SplashScreen.preventAutoHideAsync()
  // SplashScreen.hideAsync()

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }
  
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }
  
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen 
        userNumber={userNumber} 
        roundsNumber={guessRounds} 
        onStartNewGame={startNewGameHandler} 
      />
    )
  }


  return (
    <>
      <StatusBar style='dark' />
      <LinearGradient colors={[Colors.accent500, Colors.primary700]} style={styles.rootScreen}>
        <ImageBackground 
          source={require('./assets/images/background.png')}
          resizeMode='cover'
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    // backgroundColor: '#ddb52f'
  },
  backgroundImage: {
    opacity: 0.3
  }
})
