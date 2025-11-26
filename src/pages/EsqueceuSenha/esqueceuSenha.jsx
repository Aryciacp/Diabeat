// EM: src/pages/EsqueceuSenha/esqueceuSenha.jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from "./esqueceuSenha.style.js"; 
import { COLORS } from "../../constants/theme"; 
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import api from "../../services/api"; 

const LogoImage = require('../../assets/logo.png'); 

function RecuperarSenha({ navigation }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRecover = async () => {
        if (!email) return Alert.alert("Atenção", "Informe seu e-mail.");

        try {
            setLoading(true);
            await api.post('/users/recover-password', { email });
            setLoading(false);
            
            Alert.alert(
                "E-mail Enviado!",
                "Verifique seu e-mail para pegar o código.",
                [
                    { 
                        text: "Digitar Código", 
                        // Mágica aqui: Passamos o email para a próxima tela
                        onPress: () => navigation.navigate('ResetPassword', { email: email }) 
                    }
                ]
            );

        } catch (error) {
            setLoading(false);
            // Mesmo com erro, fingimos sucesso por segurança ou alertamos
            Alert.alert("Sucesso", "Se o e-mail existir, o código foi enviado.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formGroup}>
                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
                        <Image source={LogoImage} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
                    </View>
                    
                    <Text style={styles.titleText}>Recuperar Senha</Text> 
                    <Text style={{ color: COLORS.white, textAlign: 'center', marginBottom: 20 }}>
                        Digite seu e-mail para receber o código.
                    </Text>

                    <View style={styles.form}>
                        <TextBox 
                            label="E-mail"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        <Button 
                            texto={loading ? "Enviando..." : "Enviar Código"} 
                            onPress={handleRecover}
                            disabled={loading}
                            buttonStyle={{ width: '100%', backgroundColor: '#008000' }} 
                        />
                    </View>

                    {/* Botão de Atalho */}
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.white }}>Já tem o código?</Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('ResetPassword', { email: email })}
                            style={{ padding: 10 }}
                        >
                            <Text style={{ color: '#FFD700', fontWeight: 'bold', textDecorationLine: 'underline' }}>
                                Digitar Código Manualmente
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

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