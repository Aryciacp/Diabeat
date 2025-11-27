// EM: src/pages/ResetPassword/ResetPassword.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './resetPassword.style.js'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import TextBox from '../../components/textbox/textbox.jsx';
import Button from '../../components/button/button.jsx';

// --- IMPORT DO ALERTA ---
import CustomAlert from '../../components/customAlert/CustomAlert.jsx';

const LogoImage = require('../../assets/logo.png'); 

export default function ResetPassword({ navigation, route }) {
    
    // Parâmetros vindos do Deep Link (email e token)
    const paramsToken = route.params?.token;
    const paramsEmail = route.params?.email;

    const [token, setToken] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    // --- ESTADOS DO ALERTA ---
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({ title: "", message: "", type: "error" });

    useEffect(() => {
        if (paramsToken) setToken(paramsToken);
        if (paramsEmail) setEmail(paramsEmail);
    }, [paramsToken, paramsEmail]);

    // Helper para mostrar alerta
    const mostrarAlerta = (title, message, type = "error") => {
        setAlertData({ title, message, type });
        setAlertVisible(true);
    };

    const fecharAlerta = () => {
        setAlertVisible(false);
        // Se for sucesso, manda pro login ao fechar
        if (alertData.type === 'success') {
            navigation.navigate('Login');
        }
    };

    // --- VALIDAÇÃO ---
    const validarFormulario = () => {
        const emailLimpo = email.trim();
        const tokenLimpo = token.trim();
        const senhaLimpa = novaSenha.trim();
        const confSenhaLimpa = confirmarSenha.trim();

        if (!emailLimpo || !tokenLimpo || !senhaLimpa || !confSenhaLimpa) {
            mostrarAlerta("Campos Vazios", "Por favor, preencha todos os campos.");
            return null;
        }

        if (tokenLimpo.length < 6) {
            mostrarAlerta("Código Inválido", "O código deve ter 6 dígitos.");
            return null;
        }

        // Regra de Senha Forte
        const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!senhaForteRegex.test(senhaLimpa)) {
            mostrarAlerta("Senha Fraca", "A nova senha deve ter 8 caracteres, maiúscula, minúscula, número e símbolo.");
            return null;
        }

        if (senhaLimpa !== confSenhaLimpa) {
            mostrarAlerta("Senhas Diferentes", "As senhas não conferem.");
            return null;
        }

        return { email: emailLimpo, token: tokenLimpo, newPassword: senhaLimpa };
    };

    const handleReset = async () => {
        const dadosValidos = validarFormulario();
        if (!dadosValidos) return;

        try {
            setLoading(true);
            
            await api.post('/users/reset-password', dadosValidos);

            setLoading(false);
            mostrarAlerta("Sucesso!", "Sua senha foi redefinida com sucesso.", "success");

        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.error || "Não foi possível alterar a senha.";
            mostrarAlerta("Erro", msg, "error");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <CustomAlert 
                visible={alertVisible}
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                onClose={fecharAlerta}
            />

            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* Logo fora do card para destaque */}
                <View style={styles.logoContainer}>
                    <Image source={LogoImage} style={styles.logo} />
                </View>

                {/* --- CARD BRANCO --- */}
                <View style={styles.card}>
                    
                    <Text style={styles.titleText}>Nova Senha</Text> 
                    <Text style={styles.subtitleText}>Preencha os dados abaixo</Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextBox 
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Seu e-mail"
                            editable={!paramsEmail} 
                            keyboardType="email-address"
                            autoCapitalize="none"
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Código de Verificação</Text>
                        <TextBox 
                            value={token}
                            onChangeText={setToken}
                            placeholder="Ex: 123456"
                            keyboardType="numeric"
                            maxLength={6}
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Nova Senha</Text>
                        <TextBox 
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            isPassword={true}
                            placeholder="Mín. 8 caracteres"
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.form}>
                         <Text style={styles.label}>Confirmar Senha</Text>
                        <TextBox 
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            isPassword={true}
                            placeholder="Repita a senha"
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            texto={loading ? "Salvando..." : "Definir Nova Senha"} 
                            onPress={handleReset}
                            disabled={loading}
                            buttonStyle={styles.mainButton} 
                        />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                        <Text style={styles.backText}>Cancelar</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}