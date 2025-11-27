import React from 'react';
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
import DeletarConta from './src/pages/DeletarConta/DeletarConta.jsx';
import HistoricoGlicemia from './src/pages/HistoricoGlicemia/HistoricoGlicemia.jsx';

// --- NOVAS TELAS DE RECEITAS ---
import ReceitasLista from './src/pages/ReceitasLista/ReceitasLista.jsx';
import ReceitaDetalhe from './src/pages/ReceitaDetalhe/ReceitaDetalhe.jsx'; // Importação corrigida da pasta

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// (Removi o ReceitasStack pois não precisamos mais dele aqui)

// --- Configuração de Linking (Deep Link) ---
const linking = {
  prefixes: ['diabeat://'],
  config: {
    screens: {
      ResetPassword: 'reset-password',
      DeletarConta: 'delete-account', 
    }
  }
};

// --- Função 'MainAppTabs' ---
function MainAppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#BDBDBD',
                
                // --- CONFIGURAÇÃO DA BARRA ---
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 40, 
                    width: '100%', 
                    alignSelf: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 50, 
                    height: 65, 
                    paddingBottom: 0, 
                    paddingTop: 0,
                    borderTopWidth: 0,
                    ...styles.shadow, 
                },
                tabBarItemStyle: {
                    height: 65, 
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10, 
                },
                tabBarIconStyle: {
                    marginTop: 0,
                }
            })}
        >
            {/* Aba 1: Perfil */}
            <Tab.Screen
                name="Perfil"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={styles.focusedIconContainer}>
                                <FontAwesome name="home" size={22} color="#FFFFFF" />
                            </View>
                        ) : (
                            <FontAwesome name="home" size={26} color={color} />
                        )
                    ),
                }}
            />

            {/* Aba 2: Glicemia */}
            <Tab.Screen
                name="Glicemia"
                component={Glicemia}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={styles.focusedIconContainer}>
                                <FontAwesome name="comment" size={22} color="#FFFFFF" />
                            </View>
                        ) : (
                            <FontAwesome name="comment" size={26} color={color} />
                        )
                    ),
                }}
            />

            {/* Aba 3: RECEITAS */}
            <Tab.Screen
                name="ReceitasTab" 
                component={ReceitasLista} // <--- MUDANÇA: Chama a lista direto aqui
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={styles.focusedIconContainer}>
                                <FontAwesome name="cutlery" size={20} color="#FFFFFF" />
                            </View>
                        ) : (
                            <FontAwesome name="cutlery" size={26} color={color} />
                        )
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// --- O Navegador Principal ---
export default function App() {
    return (
        <NavigationContainer linking={linking}> 
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false, 
                }}
            >
                {/* Telas de Autenticação */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
                <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                
                {/* Tela Principal (Abas) */}
                <Stack.Screen 
                    name="MainApp"
                    component={MainAppTabs} 
                />

                {/* Telas Internas / Modais */}
                <Stack.Screen name="MudarSenha" component={MudarSenha} />
                <Stack.Screen name="DeletarConta" component={DeletarConta} />
                
                <Stack.Screen 
                    name="RegistroGlicemico"
                    component={RegistroGlicemico}
                    options={{ presentation: 'modal' }}
                />
                <Stack.Screen 
                    name="Exames" 
                    component={Exames}
                />
                <Stack.Screen 
                    name="UploadExame" 
                    component={UploadExame} 
                    options={{ presentation: 'modal' }}
                />
                <Stack.Screen name="HistoricoGlicemia" component={HistoricoGlicemia} />

                {/* --- AQUI ESTÁ A MÁGICA --- */}
                {/* Colocamos ReceitaDetalhe FORA das abas, na pilha principal */}
                <Stack.Screen 
                    name="ReceitaDetalhe" 
                    component={ReceitaDetalhe} 
                    options={{ animation: 'slide_from_right' }} // Animação opcional bonita
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

// --- Estilos do Ícone Focado ---
const styles = StyleSheet.create({
    focusedIconContainer: {
        backgroundColor: '#46A376', 
        width: 40,  
        height: 40, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center',   
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    shadow: {
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1,
    }
});