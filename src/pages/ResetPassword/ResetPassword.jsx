// EM: src/pages/ResetPassword/ResetPassword.jsx (COMPLETO E NOVO)

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// (Vamos reusar o estilo do 'RecuperarSenha', que é idêntico)
import { styles } from '../EsqueceuSenha/esqueceuSenha.style.js'; 
import { COLORS } from '../../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import TextBox from '../../components/textbox/textbox.jsx';
import Button from '../../components/button/button.jsx';

// (Ajuste o caminho da logo se estiver incorreto)
const LogoImage = require('../../assets/logo.png'); 

// 1. Receba 'route' para pegar os parâmetros do link
export default function ResetPassword({ navigation, route }) {
    
    // 2. O token vem da ROTA (do deep link)
    const [token, setToken] = useState(null);
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // 3. Pega o token da rota quando a tela abre
    useEffect(() => {
        if (route.params?.token) {
            setToken(route.params.token);
            console.log("Token recebido do deep link:", route.params.token);
        } else {
            // Isso pode acontecer se o usuário tentar navegar para cá manualmente
            Alert.alert("Erro", "Token de redefinição não encontrado ou inválido.");
            navigation.navigate('Login');
        }
    }, [route.params]);

    const handleReset = async () => {
        if (!novaSenha || !confirmarSenha) {
            Alert.alert("Erro", "Por favor, preencha os campos de senha.");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }
        if (!token) {
            Alert.alert("Erro", "Token não encontrado. Tente novamente.");
            return;
        }

        try {
            // 4. Envia o token (do estado) e a nova senha
            const response = await api.post('/users/reset-password', {
                token: token,
                newPassword: novaSenha
            });

            Alert.alert(
                "Sucesso!",
                "Sua senha foi redefinida com sucesso. Você já pode fazer o login.",
                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );

        } catch (error) {
            const errorMessage = error.response?.data?.error || "Token inválido ou expirado. Tente novamente.";
            Alert.alert("Erro ao Redefinir", errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.formGroup}>
                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
                        <Image 
                            source={LogoImage} 
                            style={{ width: 150, height: 150, resizeMode: 'contain' }} 
                        />
                    </View>
                    
                    <Text style={styles.titleText}>Criar Nova Senha</Text> 

                    <View style={styles.form}>
                        <TextBox 
                            label="Nova Senha"
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            isPassword={true}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="Confirmar Nova Senha"
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            isPassword={true}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                        />
                    </View>

                    <View style={styles.form}>
                        <Button 
                            texto="Salvar Nova Senha" 
                            onPress={handleReset}
                            buttonStyle={{ width: '100%', backgroundColor: '#008000' }} 
                            textStyle={{ color: COLORS.white, fontWeight: 'bold' }} 
                        />
                    </View>
                </View>

                {/* Rodapé vazio */}
                <View style={styles.footer} />

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}