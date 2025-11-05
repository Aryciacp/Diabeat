// EM: src/pages/login/login.jsx (CORRIGIDO)

import React, { useState, useEffect } from "react"; // <-- Import 'useEffect'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Alert, 
    StyleSheet,
    Image,
    Button as BotaoNativo // <-- 'Button' nativo renomeado
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./login.style";
import { COLORS, FONT_SIZE } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); // (Verifique este caminho!)

// Importe a biblioteca do teclado
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Imports do Google Auth
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx"; // O seu botão customizado
import api from "../../services/api"; // Importa a API (mock ou real)

// Necessário para o fluxo web do Google Auth
WebBrowser.maybeCompleteAuthSession();

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // --- LÓGICA DO GOOGLE SIGN-IN (CORRIGIDA) ---
    // Deixamos APENAS o 'expoClientId' para forçar o fluxo WEB no Expo Go
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        
        // 1. Deixe APENAS o seu ID de cliente WEB (o que você criou para o Expo Go)
        expoClientId: '476403505993-4rgdk8p9kc15v9kbt70c5gfbg5ojn6if.apps.googleusercontent.com',
        androidClientId: '476403505993-60097qa14u69nu6g8ds7c9b6jm6hlgok.apps.googleusercontent.com',
        // 2. Mantenha os escopos
        scopes: ['openid', 'profile', 'email'],

        useProxy: true,
        // 3. (As linhas 'androidClientId' e 'iosClientId' foram REMOVIDAS)
    });

    // Hook que "ouve" a resposta do Google
    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            console.log('ID Token recebido do Google. Verificando no backend...');
            verificarTokenNoBackend(id_token);
        } else if (response?.type === 'error') {
            Alert.alert('Erro no Login Google', response.params.error_description || 'Algo deu errado');
        }
    }, [response]);

    // Função que envia o token do Google para o SEU backend
    const verificarTokenNoBackend = async (token) => {
        try {
            const backendResponse = await api.post('/auth/google/verify', { token }); 
            const { token: siteToken } = backendResponse.data; 
            api.defaults.headers.common['Authorization'] = `Bearer ${siteToken}`;
            Alert.alert("Sucesso!", "Login com Google realizado!");
            navigation.navigate('UserProfile');
        } catch (error) {
            console.error('Erro ao verificar token no backend:', error.response?.data || error.message);
            Alert.alert('Erro no Login', 'Falha ao verificar as credenciais com o servidor.');
        }
    };
    // --- FIM DA LÓGICA DO GOOGLE ---

    // --- (Sua função handleLogin (Mock e Real) ---
    const handleLogin = async () => {
        if (email.toLowerCase() === 'admin@admin.com' && senha === 'admim') {
          console.log("LOGIN MOCK DE ADMIN DETECTADO!");
          api.enableMockMode(); 
          Alert.alert(
              "Sucesso (Modo Mock)!", 
              "Logado como Admin de Frontend. A API real está desligada.",
              [{ text: "OK", onPress: () => navigation.navigate('UserProfile') }] 
          );
          return; 
        }
        
        if (!email || !senha) {
            Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
            return;
        }

        try {
            const response = await api.post('/users/login', { email, password: senha });
            const { token } = response.data;
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
            Alert.alert(
            "Sucesso!", 
            "Login realizado com sucesso!",
            [{ text: "OK", onPress: () => navigation.navigate('MainApp') }] 
        );
        } catch (error) {
            // ... (seu catch de erro de login)
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            
            <KeyboardAwareScrollView
                style={{ flex: 1 }} 
                contentContainerStyle={styles.scrollContainer} 
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={75} 
                enableAutomaticScroll={true}
                keyboardOpeningTime={0}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false} 
            >
                
                <View style={styles.formGroup}>
                    {/* Logo */}
                    <View style={{marginTop: -100, marginBottom: -30, alignItems: 'center' }}>
                        <Image 
                            source={LogoImage} 
                            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
                        />
                    </View>
                    
                    <Text style={styles.welcomeText}>Bem-Vindo</Text> 

                    <View style={styles.form}>
                        <TextBox 
                            label="E-mail"
                            value={email}
                            onChangeText={setEmail}
                            // ... (outras props)
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
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

                    <View style={styles.form}>
                        <Button 
                            texto="Login" 
                            onPress={handleLogin} 
                            // ... (styles do botão)
                        />
                    </View>

                    {/* Botão do Google */}
                    <View style={styles.form}>
                        <BotaoNativo 
                            disabled={!request} 
                            title="Entrar com Google"
                            onPress={() => {
                              promptAsync(); 
                            }}
                            color="#DB4437"
                        />
                    </View>

                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
                            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Rodapé */}
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