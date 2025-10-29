import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login/login.jsx';
import Registro from './src/pages/registro/registro.jsx';
import RecuperarSenha from './src/pages/EsqueceuSenha/esqueceuSenha.jsx';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import ResetPassword from './src/pages/ResetPassword/ResetPassword.jsx';

// 1. ADICIONE O IMPORT DA SUA NOVA TELA AQUI
import UserProfile from './src/pages/usuario/usuario.jsx'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Login' 
        screenOptions={{
          contentStyle: { 
            flex: 1,
            backgroundColor: '#46A376',
            alignItems: 'center',
            justifyContent: 'center', 
          },
        }}
      >
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }}/>
        <Stack.Screen name='RecuperarSenha' component={RecuperarSenha}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        
        {/* 2. ADICIONE A TELA NA PILHA DE NAVEGAÇÃO AQUI */}
        <Stack.Screen name='UserProfile' component={UserProfile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}