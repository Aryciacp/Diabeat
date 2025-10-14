import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "./login.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx"; // Corrigido para import default
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// --- 1. Importações necessárias ---
import { useState } from "react";
import api from "../../services/api.ts"; // Nosso serviço de API

const Stack = createNativeStackNavigator()

function Login({ navigation }) {
    // --- 2. Estados para e-mail e senha ---
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // --- 3. Função para lidar com o login ---
    const handleLogin = async () => {
        // Verifica se os campos não estão vazios
        if (!email || !senha) {
            Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
            return;
        }

        try {
            console.log("Tentando logar com:", { email, password: "[OCULTO]" });
            
            // Faz a chamada para o endpoint de login do backend
            const response = await api.post('/users/login', {
                email: email,
                password: senha
            });

            console.log("Login bem-sucedido! Resposta do servidor:", response.data);
            Alert.alert("Sucesso!", "Login realizado com sucesso!");

            // PRÓXIMO PASSO FUTURO:
            // Aqui é onde você salvaria o token (response.data.token) no AsyncStorage
            // e navegaria para a tela principal do app (ex: a Home).

        } catch (error) {
            console.error("Erro no login:", error);
            Alert.alert("Erro", "E-mail ou senha incorretos. Tente novamente.");
        }
    };

    return <View style={styles.container}>
        <Header texto="Acesse sua conta." />

        <View style={styles.formGroup}>
            <View style={styles.form}>
                {/* --- 4. Conecta os componentes à lógica --- */}
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
        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.footerText}>Ou se Cadastre</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default Login;