// EM: src/pages/ResetPassword/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../ResetPassword/resetPassword.style.js'; 
import { COLORS } from '../../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import TextBox from '../../components/textbox/textbox.jsx';
import Button from '../../components/button/button.jsx';

const LogoImage = require('../../assets/logo.png'); 

export default function ResetPassword({ navigation, route }) {
    
    // Pega dados vindos da navegação ou link
    const paramsToken = route.params?.token;
    const paramsEmail = route.params?.email;

    const [token, setToken] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (paramsToken) setToken(paramsToken);
        if (paramsEmail) setEmail(paramsEmail);
    }, [paramsToken, paramsEmail]);

    const handleReset = async () => {
        if (!email) return Alert.alert("Erro", "E-mail obrigatório.");
        if (!token) return Alert.alert("Erro", "Código obrigatório.");
        if (!novaSenha || !confirmarSenha) return Alert.alert("Erro", "Preencha as senhas.");
        if (novaSenha !== confirmarSenha) return Alert.alert("Erro", "Senhas não coincidem.");

        try {
            setLoading(true);
            
            // Envia tudo para o backend validar
            await api.post('/users/reset-password', {
                email: email, 
                token: token,
                newPassword: novaSenha
            });

            setLoading(false);
            Alert.alert("Sucesso!", "Senha alterada.", [{ text: "Login", onPress: () => navigation.navigate('Login') }]);

        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.error || "Erro ao resetar.";
            Alert.alert("Erro", msg);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formGroup}>
                    <View style={{ marginBottom: 20, alignItems: 'center' }}>
                        <Image source={LogoImage} style={{ width: 120, height: 120, resizeMode: 'contain' }} />
                    </View>
                    
                    <Text style={styles.titleText}>Nova Senha</Text> 

                    <View style={styles.form}>
                        <Text style={{color: COLORS.white, marginBottom: 5}}>E-mail</Text>
                        <TextBox 
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Confirme seu e-mail"
                            editable={!paramsEmail} // Trava se já veio preenchido
                            inputStyle={{ backgroundColor: paramsEmail ? '#e0e0e0' : '#fff' }}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={{color: COLORS.white, marginBottom: 5}}>Código (6 números)</Text>
                        <TextBox 
                            value={token}
                            onChangeText={setToken}
                            placeholder="Ex: 123456"
                            keyboardType="numeric"
                            maxLength={6}
                            inputStyle={{ backgroundColor: '#fff' }}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={{color: COLORS.white, marginBottom: 5}}>Nova Senha</Text>
                        <TextBox 
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            isPassword={true}
                            inputStyle={{ backgroundColor: '#fff' }}
                        />
                    </View>

                    <View style={styles.form}>
                         <Text style={{color: COLORS.white, marginBottom: 5}}>Confirmar Senha</Text>
                        <TextBox 
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            isPassword={true}
                            inputStyle={{ backgroundColor: '#fff' }}
                        />
                    </View>

                    <View style={styles.form}>
                        <Button 
                            texto={loading ? "Salvando..." : "Alterar Senha"} 
                            onPress={handleReset}
                            disabled={loading}
                            buttonStyle={{ backgroundColor: '#008000' }} 
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}