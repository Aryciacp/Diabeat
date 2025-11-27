// EM: src/pages/EsqueceuSenha/esqueceuSenha.jsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from "./esqueceuSenha.style.js"; 
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import api from "../../services/api"; 

// --- IMPORT DO ALERTA ---
import CustomAlert from "../../components/customAlert/CustomAlert.jsx";

const LogoImage = require('../../assets/logo.png'); 

function RecuperarSenha({ navigation }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // --- ESTADOS DO ALERTA ---
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({ 
        title: "", 
        message: "", 
        type: "info",
        showCancel: false,
        onConfirm: null,
        confirmText: "OK"
    });

    const mostrarAlerta = (config) => {
        setAlertData({
            title: config.title,
            message: config.message,
            type: config.type || "info",
            showCancel: config.showCancel || false,
            onConfirm: config.onConfirm || null,
            confirmText: config.confirmText || "OK"
        });
        setAlertVisible(true);
    };

    const handleRecover = async () => {
        if (!email.trim()) {
            mostrarAlerta({ title: "Atenção", message: "Informe seu e-mail para continuar.", type: "error" });
            return;
        }

        try {
            setLoading(true);
            await api.post('/users/recover-password', { email });
            setLoading(false);
            
            // Alerta de Sucesso com Ação
            mostrarAlerta({
                title: "E-mail Enviado!",
                message: "Verifique sua caixa de entrada (e spam) para pegar o código de segurança.",
                type: "success",
                showCancel: true,
                cancelText: "Fechar",
                confirmText: "Digitar Código",
                onConfirm: () => navigation.navigate('ResetPassword', { email: email })
            });

        } catch (error) {
            setLoading(false);
            // Por segurança, não dizemos se o email existe ou não
            mostrarAlerta({
                title: "Processado",
                message: "Se este e-mail estiver cadastrado, você receberá o código em instantes.",
                type: "info"
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <CustomAlert 
                visible={alertVisible}
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                showCancel={alertData.showCancel}
                onConfirm={alertData.onConfirm}
                confirmText={alertData.confirmText}
                onClose={() => setAlertVisible(false)}
            />

            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* Logo fora do card */}
                <View style={styles.logoContainer}>
                    <Image source={LogoImage} style={styles.logo} />
                </View>

                {/* --- CARD BRANCO FLUTUANTE --- */}
                <View style={styles.card}>
                    
                    <Text style={styles.titleText}>Recuperar Senha</Text> 
                    <Text style={styles.subtitleText}>
                        Esqueceu sua senha? Não se preocupe. Digite seu e-mail abaixo.
                    </Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>E-mail Cadastrado</Text>
                        <TextBox 
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="exemplo@email.com"
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            texto={loading ? "Enviando..." : "Enviar Código"} 
                            onPress={handleRecover}
                            disabled={loading}
                            buttonStyle={styles.mainButton} 
                        />
                    </View>

                    {/* Link "Já tenho código" */}
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ResetPassword', { email: email })}
                        style={styles.linkContainer}
                    >
                        <Text style={styles.linkText}>
                            Já tenho um código. <Text style={styles.linkBold}>Digitar agora.</Text>
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Rodapé fora do card */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerText}>Voltar para o Login</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default RecuperarSenha;