// 1. Inicializar um novo projeto Expo
// Rode este comando no terminal
// expo init desafio-21-dias

// 2. Instalar dependências necessárias
// expo install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-navigation/native @react-navigation/stack

// 3. Estrutura inicial do App
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo ao Desafio 21 Dias!</Text>
      <Button title="Começar" onPress={() => navigation.navigate('Desafio')} />
    </View>
  );
};

const DesafioScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Seu desafio de hábitos aparecerá aqui!</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Desafio" component={DesafioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
