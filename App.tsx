// Em: App.js (COMPLETO E CORRIGIDO)

import React from 'react';
import { View, StyleSheet } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

// --- Importe TODAS as suas telas ---
import Login from './src/pages/login/login.jsx';
import Registro from './src/pages/registro/registro.jsx';
import RecuperarSenha from './src/pages/EsqueceuSenha/esqueceuSenha.jsx';
import ResetPassword from './src/pages/ResetPassword/ResetPassword.jsx';
import UserProfile from './src/pages/usuario/usuario.jsx';
import MudarSenha from './src/pages/MudarSenha/MudarSenha.jsx';
import Glicemia from './src/pages/Glicemia/Glicemia.jsx';

// --- 1. ADICIONE A IMPORTAÇÃO DA TELA QUE FALTAVA ---
import RegistroGlicemico from './src/pages/RegistroGlicemico/RegistroGlicemico.jsx';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Configuração de Linking (Deep Link) ---
const linking = {
  prefixes: ['diabeat://'], // O 'scheme' do seu app.json
  config: {
    screens: {
      // Mapeia o link diabeat://reset-password
      // para a tela 'ResetPassword' do Stack.Navigator
      ResetPassword: 'reset-password', 
    }
  }
};
// --- FIM DA ADIÇÃO ---


// --- (Função 'MainAppTabs' - Sem mudanças) ---
function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#BDBDBD",
        tabBarActiveTintColor: "#46A376",
        tabBarStyle: {
          position: "absolute",
          bottom: 45, // fixo no rodapé
          left: "60%", // centraliza horizontalmente
          transform: [{ translateX: 1 * 75 }], // desloca metade da largura pra ficar bem central
          width: 250, // comprimento fixo pra alinhar bem
          backgroundColor: "#FFFFFF",
          borderRadius: 25,
          height: 80,
          flexDirection: "row",
          justifyContent: "space-evenly", // distribui igualmente os 3 botões
          alignItems: "center", // alinha verticalmente
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      })}
    >
      {/* Aba 1: Perfil */}
      <Tab.Screen
        name="Perfil"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <View style={styles.focusedIconContainer}>
                <FontAwesome name="home" size={size} color="#FFFFFF" />
              </View>
            ) : (
              <FontAwesome name="home" size={size} color={color} />
            ),
        }}
      />

      {/* Aba 2: Glicemia */}
      <Tab.Screen
        name="Glicemia"
        component={Glicemia}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <View style={styles.focusedIconContainer}>
                <FontAwesome name="comment" size={size} color="#FFFFFF" />
              </View>
            ) : (
              <FontAwesome name="comment" size={size} color={color} />
            ),
        }}
      />

      {/* Aba 3: Refeições */}
      <Tab.Screen
        name="Refeicoes"
        component={Glicemia}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <View style={styles.focusedIconContainer}>
                <FontAwesome name="coffee" size={size} color="#FFFFFF" />
              </View>
            ) : (
              <FontAwesome name="coffee" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
// --- O Navegador Principal (com a prop 'linking') ---
export default function App() {
    return (
        // --- ADICIONE A PROP 'linking' AQUI ---
        <NavigationContainer linking={linking}> 
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false, 
                }}
            >
                {/* Telas ANTES do Login */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
                <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="MudarSenha" component={MudarSenha} />
                
                {/* Tela DEPOIS do Login (com as abas) */}
                <Stack.Screen 
                    name="MainApp"
                    component={MainAppTabs} 
                />

                {/* --- 2. ADICIONE A TELA DE REGISTRO GLICÊMICO AQUI --- */}
                <Stack.Screen 
                    name="RegistroGlicemico"
                    component={RegistroGlicemico}
                    options={{
                        presentation: 'modal' // Faz a tela deslizar de baixo para cima
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

// --- Estilos do Ícone Focado (Sem mudanças) ---
const styles = StyleSheet.create({
    focusedIconContainer: {
        backgroundColor: '#46A376', 
        width: 44,  
        height: 44, 
        borderRadius: 12, 
        justifyContent: 'center', 
        alignItems: 'center',   
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
});