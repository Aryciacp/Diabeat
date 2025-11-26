import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Alert, 
    Image,
    Button as BotaoNativo
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./login.style";
import { COLORS } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); 

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx"; 
import api from "../../services/api"; 

WebBrowser.maybeCompleteAuthSession();

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    // --- CONFIGURAÇÃO DO GOOGLE ---
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
            Alert.alert('Erro no Login Google', response.params.error_description || 'Algo deu errado');
        }
    }, [response]);

    const verificarTokenNoBackend = async (token) => {
        try {
            setLoading(true);
            const backendResponse = await api.post('/auth/google/verify', { token }); 
            const { token: siteToken } = backendResponse.data; 
            
            api.defaults.headers.common['Authorization'] = `Bearer ${siteToken}`;
            
            setLoading(false);
            navigation.navigate('MainApp'); 
        } catch (error) {
            setLoading(false);
            console.error('Erro Google Backend:', error.response?.data || error.message);
            Alert.alert('Erro', 'Falha ao confirmar login com o servidor.');
        }
    };

    // --- FUNÇÃO DE VALIDAÇÃO (NOVA) ---
    const validarFormulario = () => {
        // 1. Remove espaços em branco antes e depois
        const emailLimpo = email.trim();
        const senhaLimpa = senha.trim();

        // 2. Verifica campos vazios
        if (!emailLimpo || !senhaLimpa) {
            Alert.alert("Campos Obrigatórios", "Por favor, preencha seu e-mail e senha.");
            return null;
        }

        // 3. Validação de Formato de E-mail (Regex Padrão)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailLimpo)) {
            Alert.alert("E-mail Inválido", "Por favor, insira um endereço de e-mail válido (ex: nome@email.com).");
            return null;
        }

        // 4. Validação de Tamanho de Senha (Login)
        // Para login, validamos apenas se não é absurdamente curta (ex: < 6)
        if (senhaLimpa.length < 6) {
            Alert.alert("Senha Curta", "A senha deve ter pelo menos 6 caracteres.");
            return null;
        }

        // Retorna os dados limpos se tudo estiver ok
        return { email: emailLimpo, senha: senhaLimpa };
    };

    // --- LOGIN TRADICIONAL ---
    const handleLogin = async () => {
        // Chama a validação antes de qualquer coisa
        const dadosValidos = validarFormulario();
        
        // Se a validação falhou (retornou null), para aqui.
        if (!dadosValidos) return;

        try {
            setLoading(true);
            
            // Envia os dados já "limpos" (sem espaços)
            const response = await api.post('/users/login', { 
                email: dadosValidos.email, 
                password: dadosValidos.senha 
            });
            
            const { token } = response.data;

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
            
            setLoading(false);
            navigation.navigate('MainApp');

        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.error || "Ocorreu um erro ao fazer login.";
            Alert.alert("Erro de Acesso", msg);
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
                            onChangeText={setEmail} // Mantemos o state "sujo" enquanto digita, limpamos no submit
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                            autoCapitalize="none" 
                            keyboardType="email-address"
                            autoCorrect={false} // Evita corretor mudando o email
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
                            texto={loading ? "Carregando..." : "Login"} 
                            onPress={handleLogin} 
                            disabled={loading} 
                        />
                    </View>

                    <View style={styles.form}>
                        <BotaoNativo 
                            disabled={!request || loading} 
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