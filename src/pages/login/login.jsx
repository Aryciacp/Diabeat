import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "./login.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import api from "../../services/api.ts";

const Stack = createNativeStackNavigator()

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

    return (
        <View style={styles.container}>
            <Header texto="Acesse sua conta." />

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

                {/* --- Esqueceu a senha --- */}
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
        </View>
    );
}

export default Login;
