// ARQUIVO: src/pages/Login/Login.jsx

import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    ActivityIndicator,
    Pressable // Importante para o checkbox
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./login.style";
import { COLORS } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); 
const GOOGLE_LOGO_URL = "https://cdn-icons-png.flaticon.com/512/2991/2991148.png";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import do Armazenamento
import { FontAwesome } from "@expo/vector-icons"; // Para o ícone do checkbox

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx"; 
import api from "../../services/api"; 
import CustomAlert from "../../components/customAlert/CustomAlert.jsx";

WebBrowser.maybeCompleteAuthSession();

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true); // Estado do "Lembrar de mim"

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({ title: "", message: "", type: "error" });

    const mostrarAlerta = (title, message, type = "error") => {
        setAlertData({ title, message, type });
        setAlertVisible(true);
    };

    // --- VERIFICAÇÃO INICIAL (AUTO-LOGIN) ---
    useEffect(() => {
        const checkLogin = async () => {
            try {
                // Tenta pegar o token salvo
                const savedToken = await AsyncStorage.getItem('@diabeat:token');
                if (savedToken) {
                    // Se achou, configura a API e entra direto
                    api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
                    navigation.replace('MainApp'); // Use replace para ele não poder voltar pro login
                }
            } catch (e) {
                // Se der erro, apenas segue a vida na tela de login
            }
        };
        checkLogin();
    }, []);

    // --- FUNÇÃO AUXILIAR PARA SALVAR TOKEN ---
    const salvarSessao = async (token) => {
        if (rememberMe) {
            await AsyncStorage.setItem('@diabeat:token', token);
        }
    };

    // --- GOOGLE AUTH ---
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: '476403505993-4rgdk8p9kc15v9kbt70c5gfbg5ojn6if.apps.googleusercontent.com',
        androidClientId: '476403505993-60097qa14u69nu6g8ds7c9b6jm6hlgok.apps.googleusercontent.com',
        scopes: ['openid', 'profile', 'email'],
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            verificarTokenNoBackend(id_token);
        } else if (response?.type === 'error') {
            setGoogleLoading(false);
            mostrarAlerta('Erro no Google', 'O login foi cancelado ou falhou.');
        }
    }, [response]);

    const verificarTokenNoBackend = async (token) => {
        try {
            const backendResponse = await api.post('/auth/google/verify', { token }); 
            const { token: siteToken } = backendResponse.data; 
            
            api.defaults.headers.common['Authorization'] = `Bearer ${siteToken}`;
            
            // Salva sessão (Google também entra no "lembrar de mim")
            await salvarSessao(siteToken);

            setGoogleLoading(false);
            navigation.replace('MainApp'); 
        } catch (error) {
            setGoogleLoading(false);
            mostrarAlerta('Erro de Login', 'Falha ao confirmar conta Google.');
        }
    };

    // --- LOGIN NORMAL ---
    const validarFormulario = () => {
        const emailLimpo = email.trim();
        const senhaLimpa = senha.trim();
        if (!emailLimpo || !senhaLimpa) {
            mostrarAlerta("Atenção", "Preencha e-mail e senha.", "error");
            return null;
        }
        return { email: emailLimpo, senha: senhaLimpa };
    };

    const handleLogin = async () => {
        const dadosValidos = validarFormulario();
        if (!dadosValidos) return;

        try {
            setLoading(true);
            const response = await api.post('/users/login', { 
                email: dadosValidos.email, 
                password: dadosValidos.senha 
            });
            const { token } = response.data;
            
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
            
            // Salva sessão se o checkbox estiver marcado
            await salvarSessao(token);

            setLoading(false);
            navigation.replace('MainApp'); // Use replace aqui também

        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.error || "Erro ao fazer login.";
            mostrarAlerta("Acesso Negado", msg, "error");
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <CustomAlert 
                visible={alertVisible}
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                onClose={() => setAlertVisible(false)}
            />

            <KeyboardAwareScrollView
                style={{ flex: 1 }} 
                contentContainerStyle={styles.scrollContainer} 
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formGroup}>
                    <View style={{marginTop: -100, marginBottom: -30, alignItems: 'center' }}>
                        <Image source={LogoImage} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
                    </View>
                    
                    <Text style={styles.welcomeText}>Bem-Vindo</Text> 

                    <View style={styles.form}>
                        <TextBox 
                            label="E-mail"
                            value={email}
                            onChangeText={setEmail}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                            autoCapitalize="none" 
                            keyboardType="email-address"
                            autoCorrect={false} 
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="Senha" 
                            isPassword={true}
                            value={senha}
                            onChangeText={setSenha}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    {/* --- CHECKBOX LEMBRAR DE MIM E ESQUECEU SENHA --- */}
                    <View style={{ 
                        width: '100%', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: 20,
                        marginTop: -5 
                    }}>
                        {/* Checkbox Customizado */}
                        <Pressable 
                            style={{ flexDirection: 'row', alignItems: 'center' }} 
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={{
                                width: 20, height: 20, 
                                borderRadius: 4, 
                                borderWidth: 2, 
                                borderColor: 'white',
                                backgroundColor: rememberMe ? 'white' : 'transparent',
                                justifyContent: 'center', alignItems: 'center',
                                marginRight: 8
                            }}>
                                {rememberMe && <FontAwesome name="check" size={14} color="#46A376" />}
                            </View>
                            <Text style={{ color: 'white', fontSize: 14 }}>Lembrar de mim</Text>
                        </Pressable>

                        <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
                            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botão Login */}
                    <View style={styles.form}>
                        <Button 
                            texto={loading ? "Entrando..." : "Login"} 
                            onPress={handleLogin} 
                            disabled={loading || googleLoading} 
                        />
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>ou</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Botão Google */}
                    <View style={styles.form}>
                        <TouchableOpacity 
                            style={styles.googleButton} 
                            disabled={!request || loading || googleLoading} 
                            onPress={() => {
                                setGoogleLoading(true);
                                promptAsync(); 
                            }}
                        >
                            {googleLoading ? (
                                <ActivityIndicator size="small" color="#333" />
                            ) : (
                                <>
                                    <Image source={{ uri: GOOGLE_LOGO_URL }} style={styles.googleIcon} />
                                    <Text style={styles.googleText}>Entrar com Google</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.footerText}>Ou se Cadastre</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView> 
        </SafeAreaView>
    );
}

export default Login;