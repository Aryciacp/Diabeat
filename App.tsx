// Em: App.js (COMPLETO com 'linking' prop)

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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- 1. ADICIONE A CONFIGURAÇÃO DE LINKING AQUI ---
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
                // ... (seu código de screenOptions das abas)
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

// --- 2. O Navegador Principal (com a prop 'linking') ---
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