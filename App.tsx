// Em: App.js (COMPLETO E RESPONSIVO)

import React from 'react';
// 1. IMPORTE 'Dimensions'
import { View, StyleSheet, Dimensions } from 'react-native'; 
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
import RegistroGlicemico from './src/pages/RegistroGlicemico/RegistroGlicemico.jsx';
import Exames from './src/pages/Exames/Exames.jsx';
import UploadExame from './src/pages/UploadExame/UploadExame.jsx';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 2. PEGUE A LARGURA DA TELA
const { width } = Dimensions.get('window');

// --- Configuração de Linking (Deep Link) ---
const linking = {
  prefixes: ['diabeat://'],
  config: {
    screens: {
      ResetPassword: 'reset-password', 
    }
  }
};

// --- (Função 'MainAppTabs' - COM A CORREÇÃO) ---
function MainAppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#BDBDBD',
                
                // --- 3. ESTILO DA BARRA CORRIGIDO ---
                tabBarStyle: {
                    position: 'absolute',   // Continua flutuante
                    bottom: 35,             // Distância do fundo
                    
                    // --- MUDANÇAS AQUI ---
                    // Removemos 'left' e 'right'
                    // Adicionamos uma largura responsiva e centralizamos
                    width: width * 0.6,     // Ex: 70% da largura da tela
                    maxWidth: 400,          // Limite máximo para telas muito grandes
                    alignSelf: 'center',    // Centraliza a barra
                    // --- FIM DAS MUDANÇAS ---

                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,       
                    height: 70,             
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                }
            })}
        >
            {/* Aba 1: Perfil (Ícone de Casa) */}
            <Tab.Screen
                name="Perfil"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        focused ? (
                            <View style={styles.focusedIconContainer}>
                                <FontAwesome name="home" size={size} color="#FFFFFF" />
                            </View>
                        ) : (
                            <FontAwesome name="home" size={size} color={color} />
                        )
                    ),
                }}
            />
            {/* Aba 2: Glicemia (Ícone de Chat) */}
            <Tab.Screen
                name="Glicemia"
                component={Glicemia}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        focused ? (
                            <View style={styles.focusedIconContainer}>
                                <FontAwesome name="comment" size={size} color="#FFFFFF" />
                            </View>
                        ) : (
                            <FontAwesome name="comment" size={size} color={color} />
                        )
                    ),
                }}
            />
            {/* Aba 3: Xícara (Exemplo) */}
            <Tab.Screen
                name="Refeicoes"
                component={Glicemia} // Placeholder
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        focused ? (
                            <View style={styles.focusedIconContainer}>
                                <FontAwesome name="coffee" size={size} color="#FFFFFF" />
                            </View>
                        ) : (
                            <FontAwesome name="coffee" size={size} color={color} />
                        )
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// --- O Navegador Principal (Stack) ---
export default function App() {
    return (
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
                
                {/* Tela DEPOIS do Login (que contém TODAS as abas) */}
                <Stack.Screen 
                    name="MainApp"
                    component={MainAppTabs} 
                />

                {/* Telas "Modais" (que abrem por cima das abas) */}
                <Stack.Screen 
                    name="RegistroGlicemico"
                    component={RegistroGlicemico}
                    options={{ presentation: 'modal' }}
                />
                <Stack.Screen 
                    name="Exames" 
                    component={Exames}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="UploadExame" 
                    component={UploadExame} 
                    options={{ 
                        headerShown: false, 
                        presentation: 'modal'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// --- Estilos do Ícone Focado (Sem mudanças) ---
const styles = StyleSheet.create({
    focusedIconContainer: {
        backgroundColor: '#2E7D5A', 
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