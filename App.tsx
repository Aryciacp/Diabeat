import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login/login.jsx';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Registro from './src/pages/registro/registro.jsx';

  const Stack = createNativeStackNavigator()

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' 
    screenOptions={{
    contentStyle: 
    { flex: 1,
    backgroundColor: '#46A376',
    alignItems: 'center',
    justifyContent: 'center', }, // muda o fundo da tela
  }}
>
      <Stack.Screen name='Login'component={Login}/>
      <Stack.Screen name='Registro'component={Registro}/>
    </Stack.Navigator>
  
  </NavigationContainer>

  );
}
