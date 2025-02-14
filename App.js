import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Desafio 21 Dias!</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CriarDesafio')}>
        <Text style={styles.buttonText}>Criar Desafio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Desafio')}>
        <Text style={styles.buttonText}>Ver Desafios</Text>
      </TouchableOpacity>
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
    <View style={styles.container}>
      <Text style={styles.title}>Crie seu desafio</Text>
      
      <TextInput
        placeholder="Título do desafio"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.button} onPress={adicionarDesafio}>
        <Text style={styles.buttonText}>Adicionar Desafio</Text>
      </TouchableOpacity>
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
    <View style={styles.container}>
      <Text style={styles.title}>Seus desafios:</Text>
      
      <FlatList
        data={desafios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const dias = calcularDias(item.dataInicio);
          return (
            <View style={styles.desafioCard}>
              <View>
                <Text style={styles.desafioTitulo}>{item.titulo}</Text>
                <Text style={styles.desafioDescricao}>{item.descricao}</Text>
                <Text style={styles.desafioDias}>⏳ Dias: {dias}</Text>
              </View>
              {dias >= 21 ? (
                <Image source={require('./medalha.png')} style={styles.medalha} />
              ) : (
                <TouchableOpacity onPress={() => excluirDesafio(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4169E1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  desafioCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  desafioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  desafioDescricao: {
    color: '#555',
  },
  desafioDias: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#FF3B3B',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  medalha: {
    width: 40,
    height: 40,
  },
});
