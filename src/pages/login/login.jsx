// EM: src/pages/login/login.jsx

import { 
    View, 
    Text, 
    TouchableOpacity, 
    Alert, 
    StyleSheet,
    Image 
    // Removemos KeyboardAvoidingView, ScrollView, Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./login.style";
import { COLORS, FONT_SIZE } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); // (Verifique se este caminho está correto)

// 1. Importe a biblioteca do teclado
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api";

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        
        // --- LOGIN FALSO (MOCK) CORRIGIDO ---
        // Agora verifica E-mail E Senha
        if (email.toLowerCase() === 'admin@admin.com' && senha === 'admin') {
          console.log("LOGIN MOCK DE ADMIN DETECTADO!");
          
          api.enableMockMode(); // Ativa o "interruptor" no api.js
          
          Alert.alert(
              "Sucesso (Modo Mock)!", 
              "Logado como Admin de Frontend. A API real está desligada.",
              [{ text: "OK", onPress: () => navigation.navigate('UserProfile') }] 
          );
          
          return; // Para a função aqui
        }
        // --- FIM DA CORREÇÃO ---

        
        // --- LOGIN REAL ---
        if (!email || !senha) {
            Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
            return;
        }

        try {
            // Se o modo mock não foi ativado, esta chamada usa a 'realApi'
            const response = await api.post('/users/login', { email, password: senha });
            const { token } = response.data;
            
            // Salva o token nos headers da 'realApi'
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
            
            Alert.alert(
                "Sucesso!", 
                "Login realizado com sucesso!",
                [{ text: "OK", onPress: () => navigation.navigate('UserProfile') }] 
            );
        } catch (error) {
            if (error.response) {
                Alert.alert("Erro", "E-mail ou senha incorretos. Tente novamente.");
            } else if (error.request) {
                Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
            } else {
                Alert.alert("Erro", "Ocorreu um erro inesperado.");
            }
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            
            <KeyboardAwareScrollView
                style={{ flex: 1 }} 
                contentContainerStyle={styles.scrollContainer} 
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={75} // Ajuste para o scroll automático
                enableAutomaticScroll={true}
                keyboardOpeningTime={0}
                
                // --- PROPS PARA DESATIVAR O SCROLL MANUAL ---
                
                // 1. Esconde a barra lateral de rolagem
                showsVerticalScrollIndicator={false}
                
                // 2. Desativa a rolagem manual (arrastar com o dedo)
                // (AVISO: Se o scroll automático quebrar, remova esta linha)
                scrollEnabled={false} 
                
                // --- FIM DAS NOVAS PROPS ---
            >
                
                {/* O resto do seu layout (formGroup e footer) */}
                
                <View style={styles.formGroup}>
                    {/* Logo */}
                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
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
                            keyboardType="email-address"
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
                            buttonStyle={{ 
                                width: '100%', 
                                backgroundColor: '#008000' 
                            }} 
                            textStyle={{ 
                                color: COLORS.white, 
                                fontWeight: 'bold' 
                            }} 
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