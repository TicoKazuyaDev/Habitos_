import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo ao Desafio 21 Dias!</Text>
      <Button title="Criar Desafio" onPress={() => navigation.navigate('CriarDesafio')} />
      <Button title="Ver Desafios" onPress={() => navigation.navigate('Desafio')} />
    </View>
  );
};

const CriarDesafioScreen = ({ navigation, route }) => {
  const { desafios, setDesafios } = route.params;
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const adicionarDesafio = () => {
    if (titulo.trim() && descricao.trim()) {
      const novoDesafio = {
        id: Date.now().toString(),
        titulo,
        descricao,
        dataInicio: new Date().toISOString(),
      };
      setDesafios([...desafios, novoDesafio]);
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Crie seu desafio</Text>
      <TextInput
        placeholder="Título do desafio"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, width: '80%', margin: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={{ borderWidth: 1, width: '80%', margin: 10, padding: 5 }}
      />
      <Button title="Adicionar Desafio" onPress={adicionarDesafio} />
    </View>
  );
};

const DesafioScreen = ({ route }) => {
  const { desafios, setDesafios } = route.params;

  const calcularDias = (dataInicio) => {
    const dataInicial = new Date(dataInicio);
    const hoje = new Date();
    return Math.floor((hoje - dataInicial) / (1000 * 60 * 60 * 24));
  };

  const excluirDesafio = (id) => {
    setDesafios(desafios.filter((desafio) => desafio.id !== id));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Seus desafios:</Text>
      <FlatList
        data={desafios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
              <Text>{item.descricao}</Text>
              <Text>⏳ Dias desde o início: {calcularDias(item.dataInicio)}</Text>
            </View>
            <TouchableOpacity onPress={() => excluirDesafio(item.id)} style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  const [desafios, setDesafios] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CriarDesafio"
          component={CriarDesafioScreen}
          initialParams={{ desafios, setDesafios }}
        />
        <Stack.Screen
          name="Desafio"
          component={DesafioScreen}
          initialParams={{ desafios, setDesafios }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
