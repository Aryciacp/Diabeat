// --- IMPORTAÇÕES CORRIGIDAS ---
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native"; // 1. Removemos o SafeAreaView daqui
import { SafeAreaView } from "react-native-safe-area-context"; // 2. E importamos da biblioteca correta
import { styles } from "./login.style"

import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api";

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
            return;
        }
        try {
            console.log("Tentando logar com:", { email, password: "[OCULTO]" });
            const response = await api.post('/users/login', {
                email: email,
                password: senha
            });
            console.log("Login bem-sucedido! Resposta do servidor:", response.data);
            Alert.alert("Sucesso!", "Login realizado com sucesso!");
        } catch (error) {
            console.error("Erro no login:", error);
            Alert.alert("Erro", "E-mail ou senha incorretos. Tente novamente.");
        }
    };

    // A estrutura JSX está 100% correta
    return (
        <SafeAreaView style={styles.container}>
            <Header texto="Faça Login" />
            <View style={styles.formGroup}>
                <View style={styles.form}>
                    <TextBox 
                        label="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.form}>
                    <TextBox 
                        label="Senha" 
                        isPassword={true}
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>
                <View style={styles.form}>
                    <Button 
                        texto="Acessar" 
                        onPress={handleLogin} 
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
        </SafeAreaView>
    );
}

export default Login;