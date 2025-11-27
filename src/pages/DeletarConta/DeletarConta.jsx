// ARQUIVO: src/pages/DeletarConta/DeletarConta.jsx

import React, { useState, useRef } from 'react';
import { View, Text, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './DeletarConta.style'; 
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/button/button';
import CustomAlert from '../../components/customAlert/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL DO RENDER
const BASE_URL = "https://diabeat-api.onrender.com";

export default function DeletarConta({ navigation }) {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "info", onConfirm: null });

    const showAlert = (title, message, type = "info", onConfirm = null) => {
        setAlertConfig({ title, message, type, onConfirm });
        setAlertVisible(true);
    };

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text.length === 1 && index < 5) inputRefs.current[index + 1].focus();
        if (text.length === 0 && index > 0) inputRefs.current[index - 1].focus();
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleFinalDelete = async () => {
        Keyboard.dismiss();
        const code = otp.join('');

        if (code.length !== 6) {
            showAlert("Código Incompleto", "Por favor, preencha os 6 dígitos do código.", "error");
            return;
        }

        setLoading(true);
        
        try {
            // 1. Pega o token manualmente (Garantia de Autenticação)
            const token = await AsyncStorage.getItem('@diabeat:token');

            // 2. Usa FETCH nativo (Garantia de envio correto)
            const response = await fetch(`${BASE_URL}/users/confirm-delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o token explicitamente
                },
                body: JSON.stringify({ token: code }) // O Backend espera { token: "123456" }
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || "Erro ao confirmar exclusão.");
            }
            
            showAlert(
                "Conta Excluída", 
                "Sua conta foi apagada. Esperamos te ver novamente!", 
                "success",
                async () => {
                    await AsyncStorage.removeItem('@diabeat:token');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }
            );
            
        } catch (error) {
            console.log("ERRO:", error);
            const msg = error.message || "Código incorreto ou expirado.";
            showAlert("Erro", msg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <CustomAlert 
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onConfirm={alertConfig.onConfirm}
                onClose={() => {
                    setAlertVisible(false);
                    if (alertConfig.onConfirm) alertConfig.onConfirm();
                }}
            />

            <View style={styles.card}>
                <View style={styles.warningIconContainer}>
                    <FontAwesome name="trash" size={50} color="#D32F2F" />
                </View>

                <Text style={styles.title}>Confirme a Exclusão</Text>
                
                <Text style={styles.description}>
                    Enviamos um código de 6 dígitos para o seu e-mail. Digite-o abaixo para confirmar.
                </Text>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => inputRefs.current[index] = ref}
                            style={[
                                styles.otpBox,
                                digit ? styles.otpBoxFilled : null,
                                index === 5 ? { marginRight: 0 } : null
                            ]}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            selectTextOnFocus={true}
                            selectionColor="#D32F2F"
                        />
                    ))}
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#D32F2F" style={{marginTop: 20}} />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button 
                            texto="CONFIRMAR EXCLUSÃO" 
                            onPress={handleFinalDelete}
                            buttonStyle={{backgroundColor: '#D32F2F', width: '100%', marginBottom: 15}}
                        />
                        <Button 
                            texto="Cancelar" 
                            onPress={() => navigation.goBack()}
                            buttonStyle={{backgroundColor: '#CCC', width: '100%'}}
                            textStyle={{color: '#555'}}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}