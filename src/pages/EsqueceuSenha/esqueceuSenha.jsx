// EM: RecuperarSenha.jsx
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // 1. Importa o SafeAreaView correto
import { styles } from "./esqueceuSenha.style.js"; 
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api"; // 2. Remove a extensão ".ts"

function RecuperarSenha({ navigation }) {
    const [email, setEmail] = useState("");

    const handleRecover = async () => {
        if (!email) {
            Alert.alert("Atenção", "Por favor, informe seu e-mail.");
            return;
        }

        try {
            console.log("Solicitando recuperação de senha para:", email);

            const response = await api.post('/users/recover-password', {
                email: email,
            });

            console.log("Resposta do servidor:", response.data);
            Alert.alert(
                "Verifique seu e-mail!",
                "Enviamos instruções para criar uma nova senha."
            );
            navigation.goBack();

        } catch (error) {
            console.error("Erro ao recuperar senha:", error);
            Alert.alert("Erro", "Não encontramos esse e-mail no sistema.");
        }
    };

    // 3. A ESTRUTURA DO JSX FOI CORRIGIDA
    return (
        <SafeAreaView style={styles.container}>
            <Header texto="Recuperar Senha" />

            <View style={styles.formGroup}>
                <View style={styles.form}>
                    <TextBox 
                        label="Informe seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.form}>
                    <Button 
                        texto="Enviar" 
                        onPress={handleRecover} 
                    />
                </View>
            </View>

            {/* 4. ADICIONADO UM LINK DE "VOLTAR" */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.footerText}>Voltar para o Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default RecuperarSenha;